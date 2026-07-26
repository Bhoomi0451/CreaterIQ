import mongoose from 'mongoose';
import analysisService from '../services/analysisService.js';
import AppError from '../utils/appError.js';

/**
 * Trigger AI content analysis for an upload.
 * Route: POST /api/analysis/:uploadId
 */
export const triggerAnalysis = async (req, res, next) => {
  try {
    const { uploadId } = req.params;
    const userId = req.user.id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(uploadId)) {
      return next(new AppError('Invalid upload ID format.', 400));
    }

    const analysis = await analysisService.analyzeUpload(uploadId, userId);

    res.status(200).json({
      status: 'success',
      data: {
        analysis,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieve existing content analysis for an upload.
 * Route: GET /api/analysis/:uploadId
 */
export const getAnalysis = async (req, res, next) => {
  try {
    const { uploadId } = req.params;
    const userId = req.user.id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(uploadId)) {
      return next(new AppError('Invalid upload ID format.', 400));
    }

    const analysis = await analysisService.getAnalysisByUploadId(uploadId, userId);

    res.status(200).json({
      status: 'success',
      data: {
        analysis,
      },
    });
  } catch (error) {
    next(error);
  }
};
