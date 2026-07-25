import User from '../models/User.js';
import AppError from '../utils/appError.js';
import generateToken from '../utils/generateToken.js';

/**
 * Service to register a new user.
 * @param {Object} userData - User registration data (name, email, password, profilePicture, bio, niche, socialLinks)
 * @returns {Promise<Object>} Contains user details and signed JWT
 */
const signupUser = async (userData) => {
  const { email } = userData;

  // 1) Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email address is already registered.', 400);
  }

  // 2) Create the user in the database
  const newUser = await User.create(userData);

  // 3) Generate JWT token
  const token = generateToken(newUser._id);

  // Convert mongoose document to JSON and remove the password
  const userJson = newUser.toJSON();
  delete userJson.password;

  return {
    user: userJson,
    token,
  };
};

/**
 * Service to login an existing user.
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Contains user details and signed JWT
 */
const loginUser = async (email, password) => {
  // 1) Find user and explicitly select password since it has select: false
  const user = await User.findOne({ email }).select('+password');

  // 2) Verify user exists and password is correct
  if (!user || !(await user.comparePassword(password, user.password))) {
    throw new AppError('Incorrect email or password.', 401);
  }

  // 3) Generate token
  const token = generateToken(user._id);

  // Convert mongoose document to JSON and remove password
  const userJson = user.toJSON();
  delete userJson.password;

  return {
    user: userJson,
    token,
  };
};

/**
 * Service to retrieve a user profile by ID.
 * @param {string} id - User ID
 * @returns {Promise<Object>} The user object
 */
const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  return user;
};

export default {
  signupUser,
  loginUser,
  getUserById,
};
