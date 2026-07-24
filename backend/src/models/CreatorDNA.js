import mongoose from 'mongoose';

const creatorDNASchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'CreatorDNA must be linked to a user'],
      unique: true,
      index: true,
    },
    personality: {
      type: [String],
      default: [],
    },
    tone: {
      type: [String],
      default: [],
    },
    style: {
      type: [String],
      default: [],
    },
    targetAudience: {
      type: [String],
      default: [],
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    keywords: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const CreatorDNA = mongoose.model('CreatorDNA', creatorDNASchema);

export default CreatorDNA;
