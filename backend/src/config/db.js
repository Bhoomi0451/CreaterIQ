import mongoose from 'mongoose';
import dns from 'dns';

/**
 * Configure reliable DNS servers for Node.js DNS queries.
 * Local ISP DNS servers on Windows frequently fail SRV record resolution (querySrv ETIMEOUT).
 */
const setPublicDNS = () => {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
  } catch (err) {
    console.warn('[Database] Custom DNS configuration warning:', err.message);
  }
};

// Set DNS servers at module load
setPublicDNS();

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * Automatic retry with DNS fallback if querySrv ETIMEOUT occurs.
 */
const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not configured. Add it to your environment variables.');
  }

  const connectOptions = {
    serverSelectionTimeoutMS: Number(process.env.MONGO_CONNECT_TIMEOUT_MS) || 15000,
  };

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, connectOptions);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`);
    return conn;
  } catch (error) {
    // If SRV lookup failed due to network DNS timeout, re-set public DNS and retry once
    if (error.message && (error.message.includes('querySrv') || error.message.includes('ETIMEOUT') || error.message.includes('ENOTFOUND'))) {
      console.warn('[Database Warning] DNS SRV lookup failed. Retrying connection with Google/Cloudflare DNS...');
      setPublicDNS();
      try {
        const conn = await mongoose.connect(process.env.MONGO_URI, connectOptions);
        console.log(`[Database] MongoDB Connected (DNS Fallback): ${conn.connection.host}:${conn.connection.port}`);
        return conn;
      } catch (retryErr) {
        console.error(`[Database Error] Connection failed after DNS fallback: ${retryErr.message}`);
        throw retryErr;
      }
    }

    console.error(`[Database Error] Connection failed: ${error.message}`);
    throw error;
  }
};

export default connectDB;
