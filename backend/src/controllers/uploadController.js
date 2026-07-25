import uploadService from '../services/uploadService.js';

/**
 * Create a new upload.
 * Route: POST /api/uploads
 */
export const createUpload = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const upload = await uploadService.createUpload(userId, req.body);

    res.status(201).json({
      status: 'success',
      data: {
        upload,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all uploads belonging to the authenticated user.
 * Route: GET /api/uploads
 */
export const getMyUploads = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const uploads = await uploadService.getUploadsForUser(userId);

    res.status(200).json({
      status: 'success',
      results: uploads.length,
      data: {
        uploads,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific upload by ID.
 * Route: GET /api/uploads/:id
 */
export const getUpload = async (req, res, next) => {
  try {
    const uploadId = req.params.id;
    const userId = req.user.id;
    const upload = await uploadService.getUploadById(uploadId, userId);

    res.status(200).json({
      status: 'success',
      data: {
        upload,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a specific upload by ID.
 * Route: DELETE /api/uploads/:id
 */
export const deleteUpload = async (req, res, next) => {
  try {
    const uploadId = req.params.id;
    const userId = req.user.id;
    await uploadService.deleteUpload(uploadId, userId);

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
