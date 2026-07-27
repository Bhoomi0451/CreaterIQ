/**
 * Generates the structured prompt for content analysis based on the upload details.
 * @param {Object} upload - The upload document from the database
 * @param {string} imageDescription - Optional vision model generated image description
 * @returns {string} The fully compiled prompt for the AI analyzer
 */
export const getContentAnalysisPrompt = (upload, imageDescription = '') => {
  let mediaSection = '';
  if (upload.contentType === 'image') {
    mediaSection = `Image Visual Description: ${imageDescription || 'Image understanding is unavailable.'}`;
  } else if (upload.contentType === 'video') {
    mediaSection = `Video Script/Transcript: ${upload.script || 'No script or transcript exists. Analyze based on title, description, and caption only.'}`;
  }

  return `
You are a world-class professional Creator Economy consultant, social media strategist, and audience growth expert. Your task is to perform an in-depth strategic analysis of the following creator upload.

--- CONTENT METADATA ---
Title: ${upload.title || 'Untitled'}
Content Type: ${upload.contentType || 'video'}
Description: ${upload.description || 'No description provided'}
Caption: ${upload.caption || 'No caption provided'}
${mediaSection}
------------------------

Evaluate the content thoroughly and output a highly specific analysis matching the schema below.
For all scores (Hook, Storytelling, Caption, Thumbnail, Virality), do not output generic values. Base the scores critically on the quality, positioning, and context of the input details.

Your evaluation must cover:
1. Hook Score (0-100): Strength of the initial hook/opening.
2. Storytelling Score (0-100): Narrative quality, pacing, structure, and retention potential.
3. Caption Score (0-100): Copywriting quality, SEO, call-to-action (CTA), and readability.
4. Thumbnail Score (0-100): Conceptual strength of the video thumbnail context, or visual appeal based on the image style.
5. Virality Score (0-100): Likelihood of algorithmic push and shareability.

Also provide:
- Engagement Prediction: 2-3 sentence professional outlook on how the audience will engage.
- Best Platforms: Array of platforms suitable for this content (e.g. YouTube Shorts, Instagram Reels, TikTok, LinkedIn, Pinterest, Twitter/X, etc.).
- Improvement Suggestions: 3-4 specific, actionable feedback bullets to improve the quality and metrics of this post.
- Better Caption: A rewritten, high-converting caption with a strong CTA and ideal formatting.
- Viral Title Suggestions: Array of 3 alternative titles designed for higher click-through-rate.
- Suggested Hashtags: Array of 4-6 highly relevant hashtags (trending & niche).
- Best Posting Time: Ideal time of day/week to publish this specific content type and topic.
- Target Audience: Concise description of the demographic/interest group this content targets.
- Content Category: The niche or vertical this content belongs to (e.g. Tech, Education, Entertainment, Lifestyle, Business, etc.).
- Strengths: Array of 2-3 key strengths of the current proposal.
- Weaknesses: Array of 2-3 key weaknesses or gaps in the current proposal.

You MUST respond ONLY with a raw, valid JSON object matching the schema below. Do not wrap the JSON in markdown code blocks (\`\`\`json ... \`\`\`), do not write explanations, preambles, or postscripts.

{
  "hookScore": number,
  "storytellingScore": number,
  "captionScore": number,
  "thumbnailScore": number,
  "viralityScore": number,
  "engagementPrediction": "string",
  "bestPlatforms": ["string"],
  "improvementSuggestions": ["string"],
  "betterCaption": "string",
  "viralTitleSuggestions": ["string"],
  "suggestedHashtags": ["string"],
  "bestPostingTime": "string",
  "targetAudience": "string",
  "contentCategory": "string",
  "strengths": ["string"],
  "weaknesses": ["string"]
}
`;
};
