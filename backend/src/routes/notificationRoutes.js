import { Router } from 'express';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  clearNotifications,
} from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Protect all routes
router.use(protect);

router.get('/', getNotifications);
router.put('/mark-all-read', markAllAsRead);
router.delete('/clear', clearNotifications);
router.put('/:id/read', markAsRead);

export default router;
