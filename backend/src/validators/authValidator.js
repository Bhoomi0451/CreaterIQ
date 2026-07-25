import AppError from '../utils/appError.js';

// Regex to validate basic email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Middleware validator for user signup.
 */
export const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;

  // 1) Validate Name
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return next(new AppError('Please provide a valid name.', 400));
  }

  // 2) Validate Email
  if (!email || typeof email !== 'string' || email.trim() === '') {
    return next(new AppError('Please provide an email address.', 400));
  }
  if (!emailRegex.test(email)) {
    return next(new AppError('Please provide a valid email address.', 400));
  }

  // 3) Validate Password
  if (!password || typeof password !== 'string') {
    return next(new AppError('Please provide a password.', 400));
  }
  if (password.length < 8) {
    return next(new AppError('Password must be at least 8 characters long.', 400));
  }

  next();
};

/**
 * Middleware validator for user login.
 */
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // 1) Validate Email
  if (!email || typeof email !== 'string' || email.trim() === '') {
    return next(new AppError('Please provide an email address.', 400));
  }
  if (!emailRegex.test(email)) {
    return next(new AppError('Please provide a valid email address.', 400));
  }

  // 2) Validate Password
  if (!password || typeof password !== 'string' || password.trim() === '') {
    return next(new AppError('Please provide a password.', 400));
  }

  next();
};
