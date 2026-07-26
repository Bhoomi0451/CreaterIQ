import Notification from '../models/Notification.js';

/**
 * Creates and saves a notification for a user.
 * @param {string} userId - User ID to attach notification to
 * @param {string} type - Notification category (signup, login, upload, etc.)
 * @param {string} message - Notification text
 * @returns {Promise<Object>} Created notification document
 */
export const createNotification = async (userId, type, message) => {
  try {
    const notification = await Notification.create({
      user: userId,
      type,
      message,
    });
    return notification;
  } catch (error) {
    console.error('[Notification Helper Error]:', error);
  }
};

export default {
  createNotification,
};
