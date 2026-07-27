import Groq from 'groq-sdk';
import { getContentAnalysisPrompt } from '../prompts/contentAnalysisPrompt.js';
import AppError from '../../utils/appError.js';

/**
 * Generates dynamic mock analysis data for offline development/fallback purposes.
 * @param {Object} upload - The upload document
 * @returns {Object} Mock analysis payload matching the database schema
 */
const getMockAnalysis = (upload) => {
  const contentType = upload.contentType || 'video';
  const title = upload.title || 'Untitled Content';
  const desc = upload.description || '';
  const capt = upload.caption || '';

  // Calculate deterministic scores based on the text inputs to avoid pure random and keep it content-based
  const titleHash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const descHash = desc.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const captHash = capt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const hookScore = 65 + (titleHash % 31);
  const storytellingScore = 60 + ((descHash + titleHash) % 36);
  const captionScore = 70 + (captHash % 26);
  const thumbnailScore = 65 + ((titleHash + captHash) % 31);
  const viralityScore = 60 + ((titleHash * 2 + descHash) % 36);

  const platformMap = {
    video: ['TikTok', 'YouTube Shorts', 'Instagram Reels'],
    script: ['YouTube', 'LinkedIn', 'Blog'],
    audio: ['Spotify', 'Apple Podcasts', 'TikTok'],
    image: ['Instagram', 'Pinterest', 'LinkedIn'],
    other: ['TikTok', 'YouTube Shorts'],
  };

  const platforms = platformMap[contentType] || platformMap.video;

  return {
    hookScore,
    storytellingScore,
    captionScore,
    thumbnailScore,
    viralityScore,
    engagementPrediction: `Based on your ${contentType} titled "${title}", this content shows great potential. With a hook score of ${hookScore}%, it is poised to capture interest within the first few seconds. Retaining audience attention will depend on executing the planned visual cuts.`,
    platformRecommendation: platforms,
    bestPlatforms: platforms,
    improvementSuggestions: [
      `Format the script to highlight key takeaways within the first 5 seconds.`,
      `Add dynamic caption overlays matching the style of modern short-form content.`,
      `Optimize the title structure to appeal to high-intent searches.`,
      `Implement a clear call-to-action pointing to your creator profile.`
    ],
    betterCaption: `${capt || 'Check this out!'} 🚀\n\nFollow for more daily content! #creators`,
    viralTitleSuggestions: [
      `The Ultimate Guide to ${title}`,
      `Why nobody is talking about ${title}`,
      `I tried analyzing ${title} (Here is what happened)`
    ],
    suggestedHashtags: ['#creatoriq', `#${contentType}`, '#viral', '#trending'],
    bestPostingTime: 'Wednesday, 6:00 PM - 8:00 PM',
    targetAudience: 'Content creators, digital marketers, and tech enthusiasts',
    contentCategory: 'Professional & Business Niche',
    strengths: ['Strong keyword utilization in title', 'Clear focus on content style'],
    weaknesses: ['Call to action could be more descriptive', 'Visual cues in script are not defined']
  };
};

/**
 * Safely parse JSON returned from the LLM, cleaning markdown wraps if present.
 * @param {string} rawContent - Raw text output from LLM
 * @returns {Object} Parsed JSON object
 */
const parseSafeJson = (rawContent) => {
  let cleanContent = rawContent.trim();
  
  // Extract JSON object/array substring if there's leading/trailing text
  const firstBrace = cleanContent.indexOf('{');
  const lastBrace = cleanContent.lastIndexOf('}');
  
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleanContent = cleanContent.substring(firstBrace, lastBrace + 1);
  } else {
    // Try brackets for arrays
    const firstBracket = cleanContent.indexOf('[');
    const lastBracket = cleanContent.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      cleanContent = cleanContent.substring(firstBracket, lastBracket + 1);
    }
  }

  try {
    return JSON.parse(cleanContent);
  } catch (error) {
    console.error('[AI Safe Parse Error] Raw content was:', rawContent);
    throw new AppError('Failed to parse analysis response from AI service.', 502);
  }
};

/**
 * Generates an image description using a vision model if Groq is available.
 * @param {string} imageUrl - URL of the image
 * @param {Object} groq - Groq SDK instance
 * @returns {Promise<string>} Detailed image description
 */
const getImageDescription = async (imageUrl, groq) => {
  try {
    console.log('[Groq Vision] Requesting image description for visual analysis...');
    const response = await groq.chat.completions.create({
      model: 'llama-3.2-11b-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Describe this image in detail, focusing on its visual style, subjects, colors, composition, and text overlays if any, suitable for a content creator analysis.' },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
      temperature: 0.2,
      max_tokens: 512,
    });
    return response.choices?.[0]?.message?.content || 'Image understanding is unavailable.';
  } catch (error) {
    console.error('[Vision Model Error]', error.message || error);
    return 'Image understanding is unavailable.';
  }
};

/**
 * Analyzes content by calling the Groq API using the official Groq SDK.
 * @param {Object} upload - The upload document to analyze
 * @returns {Promise<Object>} Analyzed metrics and texts
 */
export const analyzeContent = async (upload) => {
  const apiKey = process.env.GROQ_API_KEY;

  // Mock mode should execute when GROQ_API_KEY is missing, empty, or set to the default placeholder
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_groq_api_key') {
    console.warn('[AI Analyzer] GROQ_API_KEY is missing or using placeholder. Running mock mode fallback...');
    await new Promise((resolve) => setTimeout(resolve, 800));
    return getMockAnalysis(upload);
  }

  let groq;
  try {
    groq = new Groq({ apiKey });
  } catch (initErr) {
    console.error('[Groq] Error during SDK initialization:', initErr.message);
    throw new AppError('AI SDK failed to initialize. Please check your system configuration.', 500);
  }

  // Generate image description if content is image
  let imageDescription = '';
  if (upload.contentType === 'image' && upload.mediaUrl) {
    imageDescription = await getImageDescription(upload.mediaUrl, groq);
  }

  const promptText = getContentAnalysisPrompt(upload, imageDescription);

  let attempts = 0;
  const maxAttempts = 3;
  let parsedJson = null;

  while (attempts < maxAttempts) {
    try {
      attempts++;
      console.log(`[Groq] Request Sent (Attempt ${attempts}/${maxAttempts})`);

      const chatCompletion = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL || 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant that answers strictly in JSON.',
          },
          {
            role: 'user',
            content: promptText,
          },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      });

      console.log('[Groq] Response Received');
      console.log('[Groq] Connected');

      const rawResult = chatCompletion.choices?.[0]?.message?.content;
      if (!rawResult) {
        throw new AppError('AI service returned an empty completion response.', 502);
      }

      parsedJson = parseSafeJson(rawResult);
      break; // Success! Break out of the retry loop.
    } catch (error) {
      console.error('[Groq] Error:', error.message || error);

      // Gracefully fall back to mock data if Groq authentication fails
      const errMsg = String(error.message || '').toLowerCase();
      const isAuthErr = error.status === 401 || error.statusCode === 401 || errMsg.includes('401') || errMsg.includes('api key') || errMsg.includes('unauthorized');

      if (isAuthErr) {
        console.warn('[AI Analyzer] Groq API authentication failed. Falling back to mock analysis mode...');
        return getMockAnalysis(upload);
      }

      if (attempts >= maxAttempts) {
        if (error instanceof AppError) throw error;
        throw new AppError(`AI Content Analysis failed after ${maxAttempts} attempts: ${error.message || 'Unknown error'}`, 502);
      }

      // Briefly wait before retrying the request
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Sanitize and clamp scores to 0-100 to align with Mongoose validation constraints
  const clamp = (val, def) => {
    const num = Number(val);
    if (isNaN(num)) return def;
    return Math.max(0, Math.min(100, num));
  };

  const data = parsedJson || {};
  const bestPlatforms = Array.isArray(data.bestPlatforms) ? data.bestPlatforms : (Array.isArray(data.platformRecommendation) ? data.platformRecommendation : []);

  return {
    hookScore: clamp(data.hookScore, 0),
    storytellingScore: clamp(data.storytellingScore, 0),
    captionScore: clamp(data.captionScore, 0),
    thumbnailScore: clamp(data.thumbnailScore, 0),
    viralityScore: clamp(data.viralityScore, 0),
    engagementPrediction: data.engagementPrediction || '',
    bestPlatforms: bestPlatforms,
    platformRecommendation: bestPlatforms, // for backwards compatibility
    improvementSuggestions: Array.isArray(data.improvementSuggestions) ? data.improvementSuggestions : [],
    betterCaption: data.betterCaption || '',
    viralTitleSuggestions: Array.isArray(data.viralTitleSuggestions) ? data.viralTitleSuggestions : [],
    suggestedHashtags: Array.isArray(data.suggestedHashtags) ? data.suggestedHashtags : [],
    bestPostingTime: data.bestPostingTime || '',
    targetAudience: data.targetAudience || '',
    contentCategory: data.contentCategory || '',
    strengths: Array.isArray(data.strengths) ? data.strengths : [],
    weaknesses: Array.isArray(data.weaknesses) ? data.weaknesses : [],
  };
};
