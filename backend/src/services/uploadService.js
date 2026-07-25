import Upload from '../models/Upload.js';
import AppError from '../utils/appError.js';

/**
 * Create a new upload document.
 * @param {string} userId - ID of the authenticated user
 * @param {Object} uploadData - Upload details (title, description, script, caption, videoUrl, thumbnailUrl, contentType, status)
 * @returns {Promise<Object>} The created Upload document
 */
const createUpload = async (userId, uploadData) => {
  const newUpload = await Upload.create({
    user: userId,
    ...uploadData,
  });

  return newUpload;
};

/**
 * Get all uploads for a specific user.
 * @param {string} userId - ID of the authenticated user
 * @returns {Promise<Array>} List of Upload documents
 */
const getUploadsForUser = async (userId) => {
  const uploads = await Upload.find({ user: userId });
  return uploads;
};

/**
 * Get a specific upload by ID and verify ownership.
 * @param {string} uploadId - ID of the upload to retrieve
 * @param {string} userId - ID of the authenticated user requesting access
 * @returns {Promise<Object>} The retrieved Upload document
 */
const getUploadById = async (uploadId, userId) => {
  const upload = await Upload.findById(uploadId);

  if (!upload) {
    throw new AppError('Upload not found.', 404);
  }

  // Verify ownership
  if (upload.user.toString() !== userId.toString()) {
    throw new AppError('You do not have permission to access this upload.', 403);
  }

  return upload;
};

/**
 * Delete a specific upload by ID after verifying ownership.
 * @param {string} uploadId - ID of the upload to delete
 * @param {string} userId - ID of the authenticated user requesting deletion
 * @returns {Promise<Object>} The deleted Upload document
 */
const deleteUpload = async (uploadId, userId) => {
  const upload = await Upload.findById(uploadId);

  if (!upload) {
    throw new AppError('Upload not found.', 404);
  }

  // Verify ownership
  if (upload.user.toString() !== userId.toString()) {
    throw new AppError('You do not have permission to delete this upload.', 403);
  }

  await upload.deleteOne();
  return upload;
};

export default {
  createUpload,
  getUploadsForUser,
  getUploadById,
  deleteUpload,
};
