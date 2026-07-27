import Upload from '../models/Upload.js';
import Analysis from '../models/Analysis.js';
import { analyzeContent } from '../ai/analyzers/contentAnalyzer.js';
import AppError from '../utils/appError.js';

/**
 * Triggers AI analysis for a specific upload and saves/updates it in Mongoose.
 */
const analyzeUpload = async (uploadId, userId) => {
  const upload = await Upload.findById(uploadId);

  if (!upload) {
    throw new AppError('Upload not found.', 404);
  }

  if (upload.user.toString() !== userId.toString()) {
    throw new AppError('You do not have permission to analyze this upload.', 403);
  }

  try {
    // Mark upload as processing
    upload.status = 'processing';
    await upload.save();

    // AI Analysis
    const analysisResult = await analyzeContent(upload);

    // Overall Score
    analysisResult.overallScore = Math.round(
      (
        analysisResult.hookScore +
        analysisResult.storytellingScore +
        analysisResult.captionScore +
        analysisResult.thumbnailScore +
        analysisResult.viralityScore
      ) / 5
    );

    let analysis = await Analysis.findOne({ upload: uploadId });

    if (analysis) {
      Object.assign(analysis, analysisResult);
      await analysis.save();
    } else {
      analysis = await Analysis.create({
        upload: uploadId,
        ...analysisResult,
      });
    }

    // Mark upload completed
    upload.status = 'completed';
    await upload.save();

    return analysis;
  } catch (err) {
    upload.status = 'failed';
    await upload.save();

    throw err;
  }
};

/**
 * Retrieves the saved analysis details for a specific upload.
 */
const getAnalysisByUploadId = async (uploadId, userId) => {
  const upload = await Upload.findById(uploadId);

  if (!upload) {
    throw new AppError('Upload not found.', 404);
  }

  if (upload.user.toString() !== userId.toString()) {
    throw new AppError(
      'You do not have permission to access the analysis of this upload.',
      403
    );
  }

  const analysis = await Analysis.findOne({ upload: uploadId });

  if (!analysis) {
    throw new AppError(
      'Analysis not found for this upload. Please run analysis first.',
      404
    );
  }

  return analysis;
};

export default {
  analyzeUpload,
  getAnalysisByUploadId,
};