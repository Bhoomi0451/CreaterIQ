import mongoose from 'mongoose';
import AppError from '../utils/appError.js';

/**
 * Middleware validator for creating an upload.
 */
export const validateCreateUpload = (req, res, next) => {
  const { title, contentType, status } = req.body;

  // 1) Validate Title (required, string, non-empty)
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return next(new AppError('Please provide a valid title for the upload.', 400));
  }

  // 2) Validate Content Type (optional, must be valid enum if provided)
  if (contentType !== undefined) {
    const validContentTypes = ['video', 'script', 'audio', 'image', 'other'];
    if (!validContentTypes.includes(contentType)) {
      return next(
        new AppError(
          `Content type must be one of: ${validContentTypes.join(', ')}`,
          400
        )
      );
    }
  }

  // 3) Validate Status (optional, must be valid enum if provided)
  if (status !== undefined) {
    const validStatuses = ['draft', 'pending', 'processing', 'completed', 'failed'];
    if (!validStatuses.includes(status)) {
      return next(
        new AppError(
          `Status must be one of: ${validStatuses.join(', ')}`,
          400
        )
      );
    }
  }

  next();
};

/**
 * Middleware validator to ensure the 'id' parameter is a valid MongoDB ObjectId.
 */
export const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid upload ID format.', 400));
  }

  next();
};
