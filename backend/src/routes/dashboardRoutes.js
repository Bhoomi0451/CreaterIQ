import { Router } from 'express';
import {
  getOverview,
  getStats,
  getUploads,
  getBrands,
} from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Apply auth protection globally to all dashboard routes
router.use(protect);

// Routes mapping
router.get('/', getOverview);
router.get('/stats', getStats);
router.get('/uploads', getUploads);
router.get('/brands', getBrands);

export default router;
