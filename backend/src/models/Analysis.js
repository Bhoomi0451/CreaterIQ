import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
  {
    upload: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload',
      required: [true, 'An analysis must be linked to an upload'],
      unique: true,
      index: true,
    },
    hookScore: {
      type: Number,
      min: [0, 'Score cannot be less than 0'],
      max: [100, 'Score cannot exceed 100'],
      default: 0,
    },
    overallScore: {
      type: Number,
      min: [0, 'Score cannot be less than 0'],
      max: [100, 'Score cannot exceed 100'],
      default: 0,
    },
    storytellingScore: {
      type: Number,
      min: [0, 'Score cannot be less than 0'],
      max: [100, 'Score cannot exceed 100'],
      default: 0,
    },
    captionScore: {
      type: Number,
      min: [0, 'Score cannot be less than 0'],
      max: [100, 'Score cannot exceed 100'],
      default: 0,
    },
    thumbnailScore: {
      type: Number,
      min: [0, 'Score cannot be less than 0'],
      max: [100, 'Score cannot exceed 100'],
      default: 0,
    },
    viralityScore: {
      type: Number,
      min: [0, 'Score cannot be less than 0'],
      max: [100, 'Score cannot exceed 100'],
      default: 0,
    },
    engagementPrediction: {
      type: String,
      default: '',
    },
    platformRecommendation: {
      type: [String],
      default: [],
    },
    improvementSuggestions: {
      type: [String],
      default: [],
    },
    betterCaption: {
      type: String,
      default: '',
    },
    viralTitleSuggestions: {
      type: [String],
      default: [],
    },
    suggestedHashtags: {
      type: [String],
      default: [],
    },
    bestPostingTime: {
      type: String,
      default: '',
    },
    targetAudience: {
      type: String,
      default: '',
    },
    contentCategory: {
      type: String,
      default: '',
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    bestPlatforms: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Analysis = mongoose.model('Analysis', analysisSchema);

export default Analysis;
