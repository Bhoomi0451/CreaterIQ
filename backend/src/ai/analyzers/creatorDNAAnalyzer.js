import Groq from 'groq-sdk';
import { getCreatorDNAPrompt } from '../prompts/creatorDNAPrompt.js';
import AppError from '../../utils/appError.js';

/**
 * Generates mock Creator DNA if offline/development.
 * @param {Array<Object>} uploads - User's uploads
 * @returns {Object} Mock Creator DNA data matching the schema
 */
const getMockDNA = (uploads) => {
  // Infer category from uploads content type or title keywords
  const titlesLower = uploads.map(u => (u.title || '').toLowerCase()).join(' ');
  const isTech = titlesLower.includes('code') || titlesLower.includes('program') || titlesLower.includes('tech') || titlesLower.includes('develop');

  if (isTech) {
    return {
      personality: ['Analytical', 'Passionate educator', 'Clear thinker', 'Problem solver'],
      tone: ['Informative', 'Approachable', 'Encouraging', 'Professional'],
      style: ['Hands-on live coding', 'Step-by-step breakdowns', 'Screencast with zoom effects'],
      targetAudience: ['Junior developers', 'Computer science students', 'Tech career switchers'],
      strengths: ['Strong technical explanations', 'Clean screen layout', 'High practical value'],
      weaknesses: ['Pacing can feel fast for beginners', 'Monotone voice delivery at times'],
      keywords: ['Coding', 'Software Engineering', 'Tutorial', 'React', 'Node.js', 'Web Development'],
    };
  }

  return {
    personality: ['Creative storyteller', 'Energetic entertainer', 'Authentic communicator'],
    tone: ['Vibrant', 'Casual', 'Humorous', 'Highly engaging'],
    style: ['Fast-paced jump cuts', 'Text overlays', 'Upbeat background audio'],
    targetAudience: ['Gen Z content consumers', 'Young aspiring creators', 'Social media natives'],
    strengths: ['Excellent initial hook retention', 'Charismatic delivery', 'High-energy pacing'],
    weaknesses: ['Content depth could be deeper', 'Subtle audio leveling issues'],
    keywords: ['Content Creator', 'Vlog', 'Lifestyle', 'Trends', 'Social Media', 'Entertainment'],
  };
};

/**
 * Safely parses the JSON output from the Groq completion.
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
    throw new AppError('Failed to parse Creator DNA response from AI service.', 502);
  }
};

/**
 * Analyzes and returns Creator DNA using the official Groq SDK.
 * @param {Array<Object>} uploads - List of user's uploads
 * @param {Array<Object>} analyses - List of user's content analyses
 * @returns {Promise<Object>} Synthesized Creator DNA
 */
export const analyzeCreatorDNA = async (uploads, analyses) => {
  const apiKey = process.env.GROQ_API_KEY;

  // Mock mode should execute when GROQ_API_KEY is missing, empty, or set to the default placeholder
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_groq_api_key') {
    console.warn('[Creator DNA Analyzer] GROQ_API_KEY is missing or using placeholder. Triggering mock fallback...');
    await new Promise((resolve) => setTimeout(resolve, 800));
    return getMockDNA(uploads);
  }

  const promptText = getCreatorDNAPrompt(uploads, analyses);

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
        console.warn('[Creator DNA Analyzer] Groq API authentication failed. Falling back to mock DNA mode...');
        return getMockDNA(uploads);
      }

      if (attempts >= maxAttempts) {
        if (error instanceof AppError) throw error;
        throw new AppError(`Creator DNA generation failed after ${maxAttempts} attempts: ${error.message || 'Unknown error'}`, 502);
      }

      // Briefly wait before retrying the request
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Ensure Mongoose expected arrays are present and contain strings
  const ensureStringArray = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr.map(item => String(item).trim()).filter(item => item !== '');
  };

  const data = parsedJson || {};
  return {
    personality: ensureStringArray(data.personality),
    tone: ensureStringArray(data.tone),
    style: ensureStringArray(data.style),
    targetAudience: ensureStringArray(data.targetAudience),
    strengths: ensureStringArray(data.strengths),
    weaknesses: ensureStringArray(data.weaknesses),
    keywords: ensureStringArray(data.keywords),
  };
};
