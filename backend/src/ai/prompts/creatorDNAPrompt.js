/**
 * Generates the prompt to analyze a creator's portfolio (uploads and analyses) to deduce their Creator DNA.
 * @param {Array<Object>} uploads - List of user's uploads
 * @param {Array<Object>} analyses - List of user's content analyses
 * @returns {string} The fully compiled prompt
 */
export const getCreatorDNAPrompt = (uploads, analyses) => {
  // Map upload data to analysis data for compilation
  const portfolioSummary = uploads.map((upload) => {
    const analysis = analyses.find(
      (a) => a.upload.toString() === upload._id.toString()
    );

    return `
=== CONTENT ITEM ===
Title: ${upload.title}
Content Type: ${upload.contentType}
Description: ${upload.description || 'N/A'}
Caption: ${upload.caption || 'N/A'}
Scores:
- Hook Score: ${analysis ? analysis.hookScore : 'N/A'}
- Storytelling Score: ${analysis ? analysis.storytellingScore : 'N/A'}
- Caption Score: ${analysis ? analysis.captionScore : 'N/A'}
- Thumbnail Score: ${analysis ? analysis.thumbnailScore : 'N/A'}
- Virality Score: ${analysis ? analysis.viralityScore : 'N/A'}
- Overall Score: ${analysis ? analysis.overallScore : 'N/A'}
Engagement Prediction Summary: ${analysis ? analysis.engagementPrediction : 'N/A'}
`;
  }).join('\n');

  return `
You are a senior talent manager and brand partnerships director. Analyze the creator's portfolio below to synthesize their Creator DNA.

--- CREATOR PORTFOLIO DATA ---
${portfolioSummary}
------------------------------

Based on this portfolio, construct the creator's DNA profile. You must output a raw, valid JSON object matching the exact structure below. Do not include markdown code block syntax (like \`\`\`json), preambles, or explanations.

{
  "personality": ["string", "string", ...], // 3-5 traits representing their creative personality
  "tone": ["string", "string", ...],        // 3-5 words describing their content's communication tone
  "style": ["string", "string", ...],       // 3-5 visual/structural style techniques used
  "targetAudience": ["string", "string", ...], // 3-5 specific target audience segments
  "strengths": ["string", "string", ...],    // 3-5 key strengths observed in the content/scores
  "weaknesses": ["string", "string", ...],   // 3-5 areas of improvement or relative weaknesses
  "keywords": ["string", "string", ...]      // 5-8 descriptive SEO keywords for their channel/niche
}
`;
};
