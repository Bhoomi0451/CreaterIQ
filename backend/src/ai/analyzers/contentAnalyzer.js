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

  // Seed somewhat random scores in the 70-95 range
  const randomScore = (min = 70, max = 95) => Math.floor(Math.random() * (max - min + 1)) + min;

  const hookScore = randomScore(75, 95);
  const storytellingScore = randomScore(70, 92);
  const captionScore = randomScore(72, 90);
  const thumbnailScore = randomScore(70, 95);
  const viralityScore = randomScore(75, 94);

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
    engagementPrediction: `Based on the content topic "${title}", this ${contentType} is predicted to capture initial user attention effectively with a hook score of ${hookScore}%. The subject matter appeals directly to target audience interests, indicating strong retention potential and standard distribution patterns across ${platforms.join(' and ')}.`,
    platformRecommendation: platforms,
    improvementSuggestions: [
      `Enhance the opening visual or verbal hook to increase viewer retention within the first 3 seconds.`,
      `Add dynamic subtitles or captions to make the content accessible to silent viewers.`,
      `Improve lighting and audio clarity to boost production value.`,
      `Incorporate a clear, single call-to-action (CTA) at the end of the content.`
    ],
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

  const promptText = getContentAnalysisPrompt(upload);

  let groq;
  try {
    groq = new Groq({ apiKey });
  } catch (initErr) {
    console.error('[Groq] Error during SDK initialization:', initErr.message);
    throw new AppError('AI SDK failed to initialize. Please check your system configuration.', 500);
  }

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
  return {
    hookScore: clamp(data.hookScore, 0),
    storytellingScore: clamp(data.storytellingScore, 0),
    captionScore: clamp(data.captionScore, 0),
    thumbnailScore: clamp(data.thumbnailScore, 0),
    viralityScore: clamp(data.viralityScore, 0),
    engagementPrediction: data.engagementPrediction || '',
    platformRecommendation: Array.isArray(data.platformRecommendation) ? data.platformRecommendation : [],
    improvementSuggestions: Array.isArray(data.improvementSuggestions) ? data.improvementSuggestions : [],
  };
};
