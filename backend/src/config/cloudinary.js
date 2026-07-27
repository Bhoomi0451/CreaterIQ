import { v2 as cloudinary } from 'cloudinary';

// Note: Environment variables are loaded in server.js entry point, but calling config here doesn't hurt.
import dotenv from 'dotenv';
dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const isCloudinaryConfigured = !!(
  cloudName && cloudName.trim() !== '' && !cloudName.includes('dev_') && !cloudName.includes('your_') &&
  apiKey && apiKey.trim() !== '' && !apiKey.includes('dev_') && !apiKey.includes('your_') &&
  apiSecret && apiSecret.trim() !== '' && !apiSecret.includes('dev_') && !apiSecret.includes('your_')
);

console.log("===== CLOUDINARY CONFIGURATION =====");
console.log("Cloud Name:", cloudName || '(not set)');
console.log("API Key:", apiKey || '(not set)');
console.log("API Secret Exists:", !!apiSecret);
console.log("Is Cloudinary Fully Configured:", isCloudinaryConfigured);
console.log("====================================");

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

export { isCloudinaryConfigured };
export default cloudinary;