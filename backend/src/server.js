import './config/env.js';

import connectDB from './config/db.js';
import app from './app.js';

// 1) HANDLE UNCAUGHT EXCEPTIONS
// Catches synchronous errors that are not handled elsewhere in code
process.on('uncaughtException', (err) => {
  console.error('[CRITICAL] Uncaught Exception! Shutting down...');
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

let server;

// 2) DATABASE CONNECTION AND SERVER STARTUP
// Do not accept requests until MongoDB is available. This makes startup
// failures deterministic instead of allowing the app to crash later.
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    const HOST = '0.0.0.0';
    server = app.listen(PORT, HOST, () => {
      console.log(`[Server] Listening on ${HOST}:${PORT} in ${process.env.NODE_ENV || 'production'} mode`);
    });
  } catch (error) {
    console.error('[CRITICAL] Database connection failed. Server was not started.');
    process.exit(1);
  }
};

startServer();

// 4) HANDLE UNHANDLED REJECTIONS
// Catches asynchronous promise rejections (e.g. database errors) that are not handled
process.on('unhandledRejection', (err) => {
  console.error('[CRITICAL] Unhandled Rejection! Shutting down gracefully...');
  console.error(err.name, err.message, err.stack);
  // Close the server first to stop accepting new requests, then exit.
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

// 5) HANDLE SYSTEM TERMINATION SIGNALS
process.on('SIGTERM', () => {
  console.log('[System] SIGTERM received. Shutting down gracefully...');
  if (server) {
    server.close(() => console.log('[System] Process terminated.'));
  }
});

process.on('SIGINT', () => {
  console.log('[System] SIGINT received. Shutting down gracefully...');
  if (server) {
    server.close(() => {
      console.log('[System] Process terminated.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
