import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'An upload must belong to a user'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title for the upload'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    script: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    videoUrl: {
      type: String,
      default: '',
    },
    mediaUrl: {
      type: String,
      default: '',
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    contentType: {
      type: String,
      enum: {
        values: ['video', 'script', 'audio', 'image', 'other'],
        message: 'Content type must be: video, script, audio, image, or other',
      },
      default: 'video',
    },
    status: {
      type: String,
      enum: {
        values: ['draft', 'pending', 'processing', 'completed', 'failed'],
        message: 'Status must be: draft, pending, processing, completed, or failed',
      },
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Upload = mongoose.model('Upload', uploadSchema);

export default Upload;
