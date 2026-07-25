import React from "react";
import { Sparkles } from "lucide-react";

const BrandRecommendation = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl">

      <div className="flex items-center gap-3 mb-4">

        <Sparkles size={28} />

        <h2 className="text-2xl font-bold">
          AI Recommendation
        </h2>

      </div>

      <p className="text-lg leading-8 text-blue-100">
        Your educational and AI-focused content is highly compatible
        with technology, software, and consumer electronics brands.
        Focus on tutorial-style content to maximize sponsorship opportunities.
      </p>

    </div>
  );
};

export default BrandRecommendation;