import CreatorDNA from '../models/CreatorDNA.js';
import Upload from '../models/Upload.js';
import Analysis from '../models/Analysis.js';
import { analyzeCreatorDNA } from '../ai/analyzers/creatorDNAAnalyzer.js';
import AppError from '../utils/appError.js';

/**
 * Generates or updates the Creator DNA document for a user based on their upload history.
 * @param {string} userId - ID of the authenticated user
 * @returns {Promise<Object>} The saved CreatorDNA document
 */
const generateCreatorDNA = async (userId) => {
  // 1) Find all uploads for the user, selecting only prompt context fields
  const uploads = await Upload.find({ user: userId }).select(
    '_id title contentType description caption'
  );
  if (uploads.length === 0) {
    throw new AppError('Please upload at least one piece of content before generating Creator DNA.', 400);
  }

  // 2) Find all content analyses linked to those uploads
  const uploadIds = uploads.map((u) => u._id);
  const analyses = await Analysis.find({ upload: { $in: uploadIds } });

  if (analyses.length === 0) {
    throw new AppError('Please analyze at least one content upload before generating Creator DNA.', 400);
  }

  // 3) Call AI analyzer
  const dnaData = await analyzeCreatorDNA(uploads, analyses);

  // 4) Upsert the CreatorDNA document in MongoDB
  let creatorDNA = await CreatorDNA.findOne({ user: userId });

  if (creatorDNA) {
    Object.assign(creatorDNA, dnaData);
    await creatorDNA.save();
  } else {
    creatorDNA = await CreatorDNA.create({
      user: userId,
      ...dnaData,
    });
  }

  return creatorDNA;
};

/**
 * Retrieves the Creator DNA document for a user.
 * @param {string} userId - ID of the authenticated user
 * @returns {Promise<Object>} The retrieved CreatorDNA document
 */
const getCreatorDNA = async (userId) => {
  const creatorDNA = await CreatorDNA.findOne({ user: userId });

  if (!creatorDNA) {
    throw new AppError('Creator DNA profile not found. Please trigger DNA generation first.', 404);
  }

  return creatorDNA;
};

export default {
  generateCreatorDNA,
  getCreatorDNA,
};
