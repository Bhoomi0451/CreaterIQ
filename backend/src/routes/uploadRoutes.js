import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
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

const uploadDir = 'src/uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

const router = Router();

// Apply authentication middleware to all routes in this router
router.use(protect);

// Routes mapping to root path
router
  .route('/')
  .post(upload.single('file'), validateCreateUpload, createUpload)
  .get(getMyUploads);

// Routes mapping to path with upload ID parameter
router
  .route('/:id')
  .all(validateObjectId)
  .get(getUpload)
  .delete(deleteUpload);

export default router;
