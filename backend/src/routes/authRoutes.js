import { Router } from 'express';
import { signup, login, getProfile, updateProfile, updatePassword } from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../validators/authValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Route to register a new user
router.post('/signup', validateSignup, signup);

// Route to log in a user
router.post('/login', validateLogin, login);

// Route to retrieve current user's profile details (protected)
router.get('/profile', protect, getProfile);

// Route to update profile details (protected)
router.put('/profile', protect, updateProfile);

// Route to update password (protected)
router.put('/password', protect, updatePassword);

export default router;
