import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import AppError from './utils/appError.js';
import globalErrorHandler from './middleware/errorMiddleware.js';

// Initialize Express App
const app = express();

// 1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body (limit size to prevent DoS)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 2) ROUTES

// Health Check Route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

// Future Route Registrations Placeholders
// TODO: app.use('/api/v1/auth', authRouter);
// TODO: app.use('/api/v1/creators', creatorsRouter);
// TODO: app.use('/api/v1/ai', aiRouter);

// 3) UNHANDLED ROUTE HANDLING
// Fallback for any routes not matched by the routers above
app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 4) GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

export default app;
