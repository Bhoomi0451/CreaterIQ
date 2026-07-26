import mongoose from 'mongoose';
import Upload from '../models/Upload.js';
import Analysis from '../models/Analysis.js';
import CreatorDNA from '../models/CreatorDNA.js';
import BrandRecommendation from '../models/BrandRecommendation.js';

/**
 * Calculates aggregated score statistics and category distributions for a user.
 * @param {string} userId - ID of the authenticated user
 * @returns {Promise<Object>} Aggregated analytics data
 */
const getDashboardStats = async (userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  // Execute all stats and distribution queries concurrently to reduce DB round-trip latency
  const [
    totalUploads,
    statsResult,
    contentTypeDistribution,
    statusDistribution,
  ] = await Promise.all([
    Upload.countDocuments({ user: userId }),
    Analysis.aggregate([
      {
        $lookup: {
          from: 'uploads',
          localField: 'upload',
          foreignField: '_id',
          as: 'uploadDoc',
        },
      },
      { $unwind: '$uploadDoc' },
      { $match: { 'uploadDoc.user': userObjectId } },
      {
        $addFields: {
          // If overallScore is missing or 0, calculate it as the average of the 5 scores on-the-fly
          overallScore: {
            $cond: {
              if: { $gt: ['$overallScore', 0] },
              then: '$overallScore',
              else: {
                $round: {
                  $avg: [
                    '$hookScore',
                    '$storytellingScore',
                    '$captionScore',
                    '$thumbnailScore',
                    '$viralityScore',
                  ],
                },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAnalyses: { $sum: 1 },
          avgOverallScore: { $avg: '$overallScore' },
          avgHookScore: { $avg: '$hookScore' },
          avgStorytellingScore: { $avg: '$storytellingScore' },
          avgCaptionScore: { $avg: '$captionScore' },
          avgThumbnailScore: { $avg: '$thumbnailScore' },
          avgViralityScore: { $avg: '$viralityScore' },
        },
      },
    ]),
    Upload.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: '$contentType', count: { $sum: 1 } } },
      { $project: { _id: 0, contentType: '$_id', count: 1 } },
    ]),
    Upload.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $project: { _id: 0, status: '$_id', count: 1 } },
    ]),
  ]);

  const stats = statsResult[0] || {
    totalAnalyses: 0,
    avgOverallScore: 0,
    avgHookScore: 0,
    avgStorytellingScore: 0,
    avgCaptionScore: 0,
    avgThumbnailScore: 0,
    avgViralityScore: 0,
  };

  // Round scores for clean presentations
  const roundedStats = {
    totalAnalyses: stats.totalAnalyses,
    avgOverallScore: Math.round(stats.avgOverallScore || 0),
    avgHookScore: Math.round(stats.avgHookScore || 0),
    avgStorytellingScore: Math.round(stats.avgStorytellingScore || 0),
    avgCaptionScore: Math.round(stats.avgCaptionScore || 0),
    avgThumbnailScore: Math.round(stats.avgThumbnailScore || 0),
    avgViralityScore: Math.round(stats.avgViralityScore || 0),
  };

  return {
    totalUploads,
    ...roundedStats,
    contentTypeDistribution,
    statusDistribution,
  };
};

/**
 * Compiles a snapshot overview of the user's dashboard.
 * @param {string} userId - ID of the authenticated user
 * @returns {Promise<Object>} Dashboard summary object
 */
const getDashboardOverview = async (userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  // Execute all overview components concurrently to reduce DB load times
  const [stats, creatorDNA, recentUploads, recentBrands] = await Promise.all([
    getDashboardStats(userId),
    CreatorDNA.findOne({ user: userId }),
    Upload.aggregate([
      { $match: { user: userObjectId } },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'analyses',
          localField: '_id',
          foreignField: 'upload',
          as: 'analysis',
        },
      },
      {
        $addFields: {
          analysis: {
            $map: {
              input: '$analysis',
              as: 'item',
              in: {
                _id: '$$item._id',
                upload: '$$item.upload',
                hookScore: '$$item.hookScore',
                storytellingScore: '$$item.storytellingScore',
                captionScore: '$$item.captionScore',
                thumbnailScore: '$$item.thumbnailScore',
                viralityScore: '$$item.viralityScore',
                engagementPrediction: '$$item.engagementPrediction',
                platformRecommendation: '$$item.platformRecommendation',
                improvementSuggestions: '$$item.improvementSuggestions',
                createdAt: '$$item.createdAt',
                updatedAt: '$$item.updatedAt',
                overallScore: {
                  $cond: {
                    if: { $gt: ['$$item.overallScore', 0] },
                    then: '$$item.overallScore',
                    else: {
                      $round: {
                        $avg: [
                          '$$item.hookScore',
                          '$$item.storytellingScore',
                          '$$item.captionScore',
                          '$$item.thumbnailScore',
                          '$$item.viralityScore',
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          analysis: { $arrayElemAt: ['$analysis', 0] },
        },
      },
    ]),
    BrandRecommendation.find({ user: userId })
      .sort({ matchPercentage: -1 })
      .limit(5),
  ]);

  return {
    stats: {
      totalUploads: stats.totalUploads,
      totalAnalyses: stats.totalAnalyses,
      avgOverallScore: stats.avgOverallScore,
    },
    creatorDNA: creatorDNA || null,
    recentUploads,
    recentBrands,
  };
};

/**
 * Returns all uploads for a user, populated with their analysis.
 * @param {string} userId - ID of the authenticated user
 * @returns {Promise<Array>} List of Upload documents with analysis data
 */
const getDashboardUploads = async (userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const uploads = await Upload.aggregate([
    { $match: { user: userObjectId } },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: 'analyses',
        localField: '_id',
        foreignField: 'upload',
        as: 'analysis',
      },
    },
    {
      $addFields: {
        analysis: {
          $map: {
            input: '$analysis',
            as: 'item',
            in: {
              _id: '$$item._id',
              upload: '$$item.upload',
              hookScore: '$$item.hookScore',
              storytellingScore: '$$item.storytellingScore',
              captionScore: '$$item.captionScore',
              thumbnailScore: '$$item.thumbnailScore',
              viralityScore: '$$item.viralityScore',
              engagementPrediction: '$$item.engagementPrediction',
              platformRecommendation: '$$item.platformRecommendation',
              improvementSuggestions: '$$item.improvementSuggestions',
              createdAt: '$$item.createdAt',
              updatedAt: '$$item.updatedAt',
              overallScore: {
                $cond: {
                  if: { $gt: ['$$item.overallScore', 0] },
                  then: '$$item.overallScore',
                  else: {
                    $round: {
                      $avg: [
                        '$$item.hookScore',
                        '$$item.storytellingScore',
                        '$$item.captionScore',
                        '$$item.thumbnailScore',
                        '$$item.viralityScore',
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        analysis: { $arrayElemAt: ['$analysis', 0] },
      },
    },
  ]);

  return uploads;
};

/**
 * Returns all saved brand recommendations for a user.
 * @param {string} userId - ID of the authenticated user
 * @returns {Promise<Array>} List of BrandRecommendation documents
 */
const getDashboardBrands = async (userId) => {
  const brands = await BrandRecommendation.find({ user: userId }).sort({
    matchPercentage: -1,
  });
  return brands;
};

export default {
  getDashboardStats,
  getDashboardOverview,
  getDashboardUploads,
  getDashboardBrands,
};
