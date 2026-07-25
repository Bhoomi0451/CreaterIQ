import { Router } from 'express';
import {
  createUpload,
  getMyUploads,
  getUpload,
  deleteUpload,
} from '../controllers/uploadController.js';
import {
  validateCreateUpload,
  validateObjectId,
} from '../validators/uploadValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Apply authentication middleware to all routes in this router
router.use(protect);

// Routes mapping to root path
router
  .route('/')
  .post(validateCreateUpload, createUpload)
  .get(getMyUploads);

// Routes mapping to path with upload ID parameter
router
  .route('/:id')
  .all(validateObjectId)
  .get(getUpload)
  .delete(deleteUpload);

export default router;
