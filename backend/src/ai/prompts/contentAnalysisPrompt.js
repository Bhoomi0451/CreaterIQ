/**
 * Generates the structured prompt for content analysis based on the upload details.
 * @param {Object} upload - The upload document from the database
 * @returns {string} The fully compiled prompt for the AI analyzer
 */
export const getContentAnalysisPrompt = (upload) => {
  return `
You are an expert social media content strategist and creator analyst. Analyze the following content upload details and provide a structured, data-driven analysis.

--- CONTENT TO ANALYZE ---
Title: ${upload.title || 'Untitled'}
Content Type: ${upload.contentType || 'video'}
Description: ${upload.description || 'No description provided'}
Script: ${upload.script || 'No script provided'}
Caption: ${upload.caption || 'No caption provided'}
--------------------------

Analyze the content details thoroughly and evaluate the following metrics, providing score values from 0 to 100:
1. Hook Score: How engaging is the start/core hook?
2. Storytelling Score: How well-structured and engaging is the narrative progression?
3. Caption Score: How effective is the caption for engagement and SEO/copywriting?
4. Thumbnail Score: Estimate potential thumbnail performance based on content context/ideas.
5. Virality Score: Overall rating of the content's potential to go viral.

Also provide:
- Engagement Prediction: A detailed paragraph predicting how the audience will engage with the content.
- Platform Recommendations: Array of social platforms where this content would perform best (e.g., "YouTube Shorts", "TikTok", "Instagram Reels", "LinkedIn").
- Improvement Suggestions: Array of actionable suggestions to improve the scores.

You MUST respond ONLY with a raw, valid JSON object matching the schema below. Do not include markdown code block syntax (like \`\`\`json), explanations, comments, or preambles.

{
  "hookScore": number (0-100),
  "storytellingScore": number (0-100),
  "captionScore": number (0-100),
  "thumbnailScore": number (0-100),
  "viralityScore": number (0-100),
  "engagementPrediction": "string",
  "platformRecommendation": ["string"],
  "improvementSuggestions": ["string"]
}
`;
};
