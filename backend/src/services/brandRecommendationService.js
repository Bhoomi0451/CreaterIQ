import BrandRecommendation from '../models/BrandRecommendation.js';
import CreatorDNA from '../models/CreatorDNA.js';
import { analyzeBrandRecommendations } from '../ai/analyzers/brandRecommendationAnalyzer.js';
import AppError from '../utils/appError.js';

/**
 * Generates and saves brand recommendations for a creator.
 * @param {string} userId - ID of the authenticated user
 * @returns {Promise<Array>} List of generated BrandRecommendation documents
 */
const generateBrandRecommendations = async (userId) => {
  // 1) Retrieve the user's Creator DNA
  const creatorDNA = await CreatorDNA.findOne({ user: userId });

  if (!creatorDNA) {
    throw new AppError('Creator DNA profile not found. Please generate Creator DNA before requesting brand matches.', 400);
  }

  // 2) Query AI brand matchmaking analyzer
  const brandMatches = await analyzeBrandRecommendations(creatorDNA);

  // 3) Map brand results to include the user reference
  const recommendationDocs = brandMatches.map((match) => ({
    user: userId,
    ...match,
  }));

  // 4) Purge existing recommendations for this user to avoid stale lists
  await BrandRecommendation.deleteMany({ user: userId });

  // 5) Bulk insert the new match cards (only if non-empty)
  let savedRecommendations = [];
  if (recommendationDocs.length > 0) {
    savedRecommendations = await BrandRecommendation.insertMany(recommendationDocs);
  }

  return savedRecommendations;
};

/**
 * Retrieves all saved brand recommendations for a user.
 * @param {string} userId - ID of the authenticated user
 * @returns {Promise<Array>} List of BrandRecommendation documents
 */
const getBrandRecommendations = async (userId) => {
  const recommendations = await BrandRecommendation.find({ user: userId });
  return recommendations;
};

export default {
  generateBrandRecommendations,
  getBrandRecommendations,
};
