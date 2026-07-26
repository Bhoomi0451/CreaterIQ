import Notification from '../models/Notification.js';
import AppError from '../utils/appError.js';

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: notifications.length,
      data: {
        notifications,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return next(new AppError('Notification not found.', 404));
    }

    if (notification.user.toString() !== req.user.id) {
      return next(new AppError('You do not have permission to modify this notification.', 403));
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({
      status: 'success',
      data: {
        notification,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({
      status: 'success',
      message: 'All notifications marked as read.',
    });
  } catch (error) {
    next(error);
  }
};

export const clearNotifications = async (req, res, next) => {
  try {
    await Notification.deleteMany({ user: req.user.id });

    res.status(200).json({
      status: 'success',
      message: 'All notifications cleared.',
    });
  } catch (error) {
    next(error);
  }
};
