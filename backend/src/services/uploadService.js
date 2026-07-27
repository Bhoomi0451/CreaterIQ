import fs from 'fs';
import cloudinary, { isCloudinaryConfigured } from '../config/cloudinary.js';
import Upload from '../models/Upload.js';
import AppError from '../utils/appError.js';

/**
 * Create a new upload document.
 * @param {string} userId - ID of the authenticated user
 * @param {Object} uploadData - Upload details (title, description, script, caption, contentType, status)
 * @param {Object} file - Multer file object
 * @returns {Promise<Object>} The created Upload document
 */
const createUpload = async (userId, uploadData, file, req) => {
  if (!file) {
    throw new AppError('Media file is required.', 400);
  }

  let mediaUrl = '';
  let thumbnailUrl = '';
  let usingLocalStorage = false;

  try {
    if (isCloudinaryConfigured) {
      try {
        console.log('[UploadService] Attempting Cloudinary upload...');
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: 'auto',
          folder: 'creatoriq',
        });

        mediaUrl = result.secure_url;

        // Generate thumbnailUrl
        if (result.resource_type === 'video') {
          // Replace file extension with .jpg to get the video poster thumbnail URL
          thumbnailUrl = result.secure_url.replace(/\.[^/.]+$/, '.jpg');
        } else if (result.resource_type === 'image') {
          thumbnailUrl = result.secure_url;
        }
      } catch (error) {
        console.error('[Cloudinary Upload Error] falling back to local storage:', error.message || error);
        usingLocalStorage = true;
      }
    } else {
      console.log('[UploadService] Cloudinary not configured or using dev keys. Falling back to local storage.');
      usingLocalStorage = true;
    }

    if (usingLocalStorage) {
      let baseUrl = 'http://localhost:5000';
      if (req) {
        const protocol = req.protocol;
        const host = req.get('host');
        baseUrl = `${protocol}://${host}`;
      }
      mediaUrl = `${baseUrl}/uploads/${file.filename}`;
      thumbnailUrl = mediaUrl;
    }
  } finally {
    // Safely delete local temp file ONLY if we uploaded to Cloudinary
    if (!usingLocalStorage && file.path && fs.existsSync(file.path)) {
      try {
        fs.unlinkSync(file.path);
      } catch (err) {
        console.error('Failed to delete temp file:', err);
      }
    }
  }

  const newUpload = await Upload.create({
    user: userId,
    title: uploadData.title,
    description: uploadData.description,
    caption: uploadData.caption,
    script: uploadData.script || '',
    contentType: uploadData.contentType || (file.mimetype.startsWith('image/') ? 'image' : 'video'),
    mediaUrl,
    videoUrl: mediaUrl, // Duplicate videoUrl for backwards compatibility
    thumbnailUrl,
    status: 'completed', // Status is completed now that media upload finished successfully
  });

  const uploadObj = newUpload.toObject();
  uploadObj.secure_url = mediaUrl;
  return uploadObj;
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
