import Upload from '../models/Upload.js';
import Analysis from '../models/Analysis.js';
import { analyzeContent } from '../ai/analyzers/contentAnalyzer.js';
import AppError from '../utils/appError.js';

/**
 * Triggers AI analysis for a specific upload and saves/updates it in Mongoose.
 * @param {string} uploadId - ID of the upload to analyze
 * @param {string} userId - ID of the authenticated user requesting the analysis
 * @returns {Promise<Object>} The saved or updated Analysis document
 */
const analyzeUpload = async (uploadId, userId) => {
  // 1) Find the upload and verify ownership
  const upload = await Upload.findById(uploadId);

  if (!upload) {
    throw new AppError('Upload not found.', 404);
  }

  if (upload.user.toString() !== userId.toString()) {
    throw new AppError('You do not have permission to analyze this upload.', 403);
  }

  // 2) Execute the content analysis (Groq completion or mock fallback)
  const analysisResult = await analyzeContent(upload);

  // Calculate overallScore as average of the 5 sub-scores
  const overallScore = Math.round(
    (analysisResult.hookScore +
      analysisResult.storytellingScore +
      analysisResult.captionScore +
      analysisResult.thumbnailScore +
      analysisResult.viralityScore) /
      5
  );
  analysisResult.overallScore = overallScore;

  // 3) Find existing analysis or create a new one to prevent duplicate key violations
  let analysis = await Analysis.findOne({ upload: uploadId });

  if (analysis) {
    // Update the existing analysis
    Object.assign(analysis, analysisResult);
    await analysis.save();
  } else {
    // Create a new analysis record
    analysis = await Analysis.create({
      upload: uploadId,
      ...analysisResult,
    });
  }

  return analysis;
};

/**
 * Retrieves the saved analysis details for a specific upload.
 * @param {string} uploadId - ID of the upload
 * @param {string} userId - ID of the authenticated user requesting the analysis
 * @returns {Promise<Object>} The retrieved Analysis document
 */
const getAnalysisByUploadId = async (uploadId, userId) => {
  // 1) Find the upload and verify ownership
  const upload = await Upload.findById(uploadId);

  if (!upload) {
    throw new AppError('Upload not found.', 404);
  }

  if (upload.user.toString() !== userId.toString()) {
    throw new AppError('You do not have permission to access the analysis of this upload.', 403);
  }

  // 2) Find the linked analysis document
  const analysis = await Analysis.findOne({ upload: uploadId });

  if (!analysis) {
    throw new AppError('Analysis not found for this upload. Please run analysis first.', 404);
  }

  return analysis;
};

export default {
  analyzeUpload,
  getAnalysisByUploadId,
};
