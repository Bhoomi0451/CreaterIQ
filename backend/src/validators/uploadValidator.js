import mongoose from 'mongoose';
import AppError from '../utils/appError.js';

/**
 * Middleware validator for creating an upload.
 */
export const validateCreateUpload = (req, res, next) => {
  const { title, description, caption, contentType, status } = req.body;

  // 1) Validate Title (required, string, non-empty)
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return next(new AppError('Please provide a valid title for the upload.', 400));
  }

  // 2) Validate Description (required, string, non-empty)
  if (!description || typeof description !== 'string' || description.trim() === '') {
    return next(new AppError('Please provide a valid description for the upload.', 400));
  }

  // 3) Validate Caption (required, string, non-empty)
  if (!caption || typeof caption !== 'string' || caption.trim() === '') {
    return next(new AppError('Please provide a valid caption for the upload.', 400));
  }

  // 4) Validate Media File (required)
  if (!req.file) {
    return next(new AppError('Please upload an image or video file.', 400));
  }

  // 5) Validate Content Type (optional, must be valid enum if provided)
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

  // 6) Validate Status (optional, must be valid enum if provided)
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
