import authService from '../services/authService.js';
import User from '../models/User.js';
import { createNotification } from '../services/notificationService.js';

/**
 * Register a new user controller.
 * Route: POST /api/auth/signup
 */
export const signup = async (req, res, next) => {
  try {
    const { user, token } = await authService.signupUser(req.body);

    // Trigger signup notification
    await createNotification(user._id, 'signup', 'Welcome to CreatorIQ! Complete your profile to unlock insights.');

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user controller.
 * Route: POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);

    // Trigger login notification
    await createNotification(user._id, 'login', 'Successfully logged in to your account.');

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile.
 * Route: GET /api/auth/profile
 */
export const getProfile = async (req, res, next) => {
  try {
    // req.user is populated by protect middleware
    res.status(200).json({
      status: 'success',
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile details.
 * Route: PUT /api/auth/profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found.',
      });
    }

    const { name, email, phone, country, bio, niche, socialLinks } = req.body;

    if (name) user.name = name;
    if (email) {
      const emailUser = await User.findOne({ email });
      if (emailUser && emailUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({
          status: 'fail',
          message: 'Email address is already in use by another account.',
        });
      }
      user.email = email;
    }
    if (phone !== undefined) user.phone = phone;
    if (country !== undefined) user.country = country;
    if (bio !== undefined) user.bio = bio;
    if (niche !== undefined) user.niche = niche;

    if (socialLinks) {
      user.socialLinks = {
        instagram: socialLinks.instagram !== undefined ? socialLinks.instagram : user.socialLinks.instagram,
        youtube: socialLinks.youtube !== undefined ? socialLinks.youtube : user.socialLinks.youtube,
        tiktok: socialLinks.tiktok !== undefined ? socialLinks.tiktok : user.socialLinks.tiktok,
        twitter: socialLinks.twitter !== undefined ? socialLinks.twitter : user.socialLinks.twitter,
        linkedin: socialLinks.linkedin !== undefined ? socialLinks.linkedin : user.socialLinks.linkedin,
        website: socialLinks.website !== undefined ? socialLinks.website : user.socialLinks.website,
      };
    }

    if (req.body.profilePicture !== undefined) user.profilePicture = req.body.profilePicture;

    await user.save();

    // Trigger success notification
    await createNotification(user._id, 'success', 'Your profile settings have been updated.');

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user password.
 * Route: PUT /api/auth/password
 */
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide current and new passwords.',
      });
    }

    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.comparePassword(currentPassword, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Your current password is incorrect.',
      });
    }

    user.password = newPassword;
    await user.save();

    // Trigger success notification
    await createNotification(user._id, 'success', 'Your password has been changed successfully.');

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};
