import dashboardService from '../services/dashboardService.js';

/**
 * Get dashboard overview snapshot.
 * Route: GET /api/dashboard
 */
export const getOverview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const overview = await dashboardService.getDashboardOverview(userId);

    res.status(200).json({
      status: 'success',
      data: overview,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get aggregated dashboard statistics and distributions.
 * Route: GET /api/dashboard/stats
 */
export const getStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const stats = await dashboardService.getDashboardStats(userId);

    res.status(200).json({
      status: 'success',
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all uploads populated with their analysis reports.
 * Route: GET /api/dashboard/uploads
 */
export const getUploads = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const uploads = await dashboardService.getDashboardUploads(userId);

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
 * Get all brand matches.
 * Route: GET /api/dashboard/brands
 */
export const getBrands = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const brands = await dashboardService.getDashboardBrands(userId);

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
