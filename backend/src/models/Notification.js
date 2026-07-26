import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Notification must belong to a user'],
      index: true,
    },
    type: {
      type: String,
      enum: {
        values: [
          'signup',
          'login',
          'upload',
          'analysis',
          'dna',
          'recommendation',
          'error',
          'success',
          'general'
        ],
        message: 'Notification type is invalid',
      },
      default: 'general',
    },
    message: {
      type: String,
      required: [true, 'Notification must have a message'],
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
