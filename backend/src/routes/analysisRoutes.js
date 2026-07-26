import { Router } from 'express';
import { triggerAnalysis, getAnalysis } from '../controllers/analysisController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Apply auth protect middleware to all routes in this router
router.use(protect);

// Route mapping
router
  .route('/:uploadId')
  .post(triggerAnalysis)
  .get(getAnalysis);

export default router;
