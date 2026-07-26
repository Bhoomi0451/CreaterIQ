import { Router } from 'express';
import { generateBrands, getBrands } from '../controllers/brandRecommendationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Apply auth protection globally to all brand recommendation routes
router.use(protect);

// Routes mapping
router.post('/generate', generateBrands);
router.get('/', getBrands);

export default router;
