/**
 * Generates the prompt to find brand recommendations for a creator based on their Creator DNA.
 * @param {Object} creatorDNA - The creator's DNA document
 * @returns {string} The fully compiled prompt
 */
export const getBrandRecommendationPrompt = (creatorDNA) => {
  return `
You are an expert influencer marketing agent matching creators with brand sponsorships. Match the creator whose DNA is detailed below with 3-5 suitable brands.

--- CREATOR DNA ---
Personality: ${creatorDNA.personality ? creatorDNA.personality.join(', ') : 'N/A'}
Tone: ${creatorDNA.tone ? creatorDNA.tone.join(', ') : 'N/A'}
Style: ${creatorDNA.style ? creatorDNA.style.join(', ') : 'N/A'}
Target Audience: ${creatorDNA.targetAudience ? creatorDNA.targetAudience.join(', ') : 'N/A'}
Strengths: ${creatorDNA.strengths ? creatorDNA.strengths.join(', ') : 'N/A'}
Keywords/Niche: ${creatorDNA.keywords ? creatorDNA.keywords.join(', ') : 'N/A'}
------------------

Recommend 3-5 commercial brands that would align with this creator's profile. You must output a raw, valid JSON object matching the exact structure below. Do not include markdown code block syntax (like \`\`\`json), preambles, or explanations.

{
  "brands": [
    {
      "brandName": "string",          // Name of the brand
      "matchPercentage": number,      // Percentage integer (0-100) reflecting the fit
      "reason": "string",             // 2-3 sentence explanation of the synergy and pitch angle
      "estimatedSponsorship": "string" // Formatted rate estimate string (e.g. "$1,500 - $3,000")
    },
    ...
  ]
}
`;
};
