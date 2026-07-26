import brandRecommendationService from '../services/brandRecommendationService.js';
import { createNotification } from '../services/notificationService.js';

/**
 * Trigger AI brand recommendations matchmaking.
 * Route: POST /api/brands/generate
 */
export const generateBrands = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const brands = await brandRecommendationService.generateBrandRecommendations(userId);

    // Trigger brand recommendations generated notification
    await createNotification(userId, 'recommendation', 'Brand matches generated successfully.');

    res.status(200).json({
      status: 'success',
      results: brands.length,
      data: {
        brands,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieve saved brand recommendations.
 * Route: GET /api/brands
 */
export const getBrands = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const brands = await brandRecommendationService.getBrandRecommendations(userId);

    res.status(200).json({
      status: 'success',
      results: brands.length,
      data: {
        brands,
      },
    });
  } catch (error) {
    next(error);
  }
};
