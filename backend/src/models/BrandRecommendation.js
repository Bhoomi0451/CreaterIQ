import mongoose from 'mongoose';

const brandRecommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Brand recommendation must be linked to a user'],
      index: true,
    },
    brandName: {
      type: String,
      required: [true, 'Please provide the brand name'],
      trim: true,
    },
    matchPercentage: {
      type: Number,
      required: [true, 'Please provide the match percentage'],
      min: [0, 'Match percentage cannot be less than 0'],
      max: [100, 'Match percentage cannot exceed 100'],
    },
    reason: {
      type: String,
      default: '',
    },
    estimatedSponsorship: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const BrandRecommendation = mongoose.model('BrandRecommendation', brandRecommendationSchema);

export default BrandRecommendation;
