import brandRecommendationService from '../services/brandRecommendationService.js';

/**
 * Trigger AI brand recommendations matchmaking.
 * Route: POST /api/brands/generate
 */
export const generateBrands = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const brands = await brandRecommendationService.generateBrandRecommendations(userId);

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
