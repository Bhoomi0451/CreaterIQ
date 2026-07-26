import Groq from 'groq-sdk';
import { getBrandRecommendationPrompt } from '../prompts/brandRecommendationPrompt.js';
import AppError from '../../utils/appError.js';

/**
 * Generates mock brand recommendations if offline/development.
 * @param {Object} creatorDNA - The creator's DNA document
 * @returns {Array<Object>} List of mock brand recommendations
 */
const getMockRecommendations = (creatorDNA) => {
  const keywordsLower = (creatorDNA.keywords || []).map(k => k.toLowerCase()).join(' ');
  const isTech = keywordsLower.includes('code') || keywordsLower.includes('tech') || keywordsLower.includes('develop') || keywordsLower.includes('program');

  if (isTech) {
    return [
      {
        brandName: 'NordVPN',
        matchPercentage: 92,
        reason: `Aligns with the creator's tech-savvy audience. Pitch should focus on online privacy, security for software developers, and remote work protection.`,
        estimatedSponsorship: '$1,500 - $3,000',
      },
      {
        brandName: 'Squarespace',
        matchPercentage: 88,
        reason: `Perfect for developers and creators showing project portfolios. Pitch by demonstrating how easily viewers can launch landing pages for their side projects.`,
        estimatedSponsorship: '$2,000 - $4,000',
      },
      {
        brandName: 'Notion',
        matchPercentage: 85,
        reason: `Fits the creator's organized, educational style. Focus on how developers can use Notion to organize their code snippets, project roadmaps, and daily workflows.`,
        estimatedSponsorship: '$1,200 - $2,500',
      },
    ];
  }

  return [
    {
      brandName: 'Skillshare',
      matchPercentage: 90,
      reason: `Matches the creator's highly educational content style. Pitch centering on continuing education, creative classes, and skill development for viewers.`,
      estimatedSponsorship: '$1,000 - $2,000',
    },
    {
      brandName: 'Athletic Greens (AG1)',
      matchPercentage: 84,
      reason: `Fits lifestyle content looking to promote daily health and nutrition habits. Suggest pitching AG1 as a daily morning routine booster for active viewers.`,
      estimatedSponsorship: '$2,500 - $5,000',
    },
    {
      brandName: 'Canva',
      matchPercentage: 87,
      reason: `Excellent fit for design, visual creation, and social media layout topics. Pitch focus should emphasize Canva's drag-and-drop ease of use for general creators.`,
      estimatedSponsorship: '$1,500 - $3,000',
    },
  ];
};

/**
 * Safely parses JSON returned from the LLM, cleaning markdown wraps.
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
    throw new AppError('Failed to parse brand recommendations from AI service.', 502);
  }
};

/**
 * Automatically maps and validates brand recommendations using the official Groq SDK.
 * @param {Object} creatorDNA - The creator's DNA document
 * @returns {Promise<Array>} List of brand recommendations
 */
export const analyzeBrandRecommendations = async (creatorDNA) => {
  const apiKey = process.env.GROQ_API_KEY;

  // Mock mode should execute when GROQ_API_KEY is missing, empty, or set to the default placeholder
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_groq_api_key') {
    console.warn('[Brand Recommendation Analyzer] GROQ_API_KEY is missing or using placeholder. Triggering mock fallback...');
    await new Promise((resolve) => setTimeout(resolve, 800));
    return getMockRecommendations(creatorDNA);
  }

  const promptText = getBrandRecommendationPrompt(creatorDNA);

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
            content: 'You are a helpful assistant that answers strictly in JSON.',
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
        throw new AppError('AI service returned an empty response.', 502);
      }

      parsedJson = parseSafeJson(rawResult);
      break; // Success! Break out of the retry loop.
    } catch (error) {
      console.error('[Groq] Error:', error.message || error);

      // Gracefully fall back to mock data if Groq authentication fails
      const errMsg = String(error.message || '').toLowerCase();
      const isAuthErr = error.status === 401 || error.statusCode === 401 || errMsg.includes('401') || errMsg.includes('api key') || errMsg.includes('unauthorized');

      if (isAuthErr) {
        console.warn('[Brand Recommendation Analyzer] Groq API authentication failed. Falling back to mock recommendations...');
        return getMockRecommendations(creatorDNA);
      }

      if (attempts >= maxAttempts) {
        if (error instanceof AppError) throw error;
        throw new AppError(`Brand Recommendation generation failed after ${maxAttempts} attempts: ${error.message || 'Unknown error'}`, 502);
      }

      // Briefly wait before retrying the request
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  const data = parsedJson || {};
  const rawBrandsList = Array.isArray(data.brands) ? data.brands : [];

  // Sanitize and clamp fields
  return rawBrandsList.map((b) => {
    const percentage = Number(b.matchPercentage);
    const clampedPercentage = isNaN(percentage) ? 75 : Math.max(0, Math.min(100, percentage));

    return {
      brandName: String(b.brandName || 'Unnamed Brand').trim(),
      matchPercentage: clampedPercentage,
      reason: String(b.reason || '').trim(),
      estimatedSponsorship: String(b.estimatedSponsorship || '').trim(),
    };
  });
};
