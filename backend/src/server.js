import dotenv from 'dotenv';
// Load environment variables immediately
dotenv.config();

import connectDB from './config/db.js';
import app from './app.js';

// 1) HANDLE UNCAUGHT EXCEPTIONS
// Catches synchronous errors that are not handled elsewhere in code
process.on('uncaughtException', (err) => {
  console.error('[CRITICAL] Uncaught Exception! Shutting down...');
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

// 2) DATABASE CONNECTION
connectDB();

// 3) START SERVER
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`[Server] Listening on Port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// 4) HANDLE UNHANDLED REJECTIONS
// Catches asynchronous promise rejections (e.g. database errors) that are not handled
process.on('unhandledRejection', (err) => {
  console.error('[CRITICAL] Unhandled Rejection! Shutting down gracefully...');
  console.error(err.name, err.message, err.stack);
  // Close the server first to stop accepting new requests, then exit
  server.close(() => {
    process.exit(1);
  });
});

// 5) HANDLE SYSTEM TERMINATION SIGNALS
process.on('SIGTERM', () => {
  console.log('[System] SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('[System] Process terminated.');
  });
});

process.on('SIGINT', () => {
  console.log('[System] SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('[System] Process terminated.');
    process.exit(0);
  });
});
