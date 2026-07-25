import React from "react";
import { Sparkles } from "lucide-react";

const CreatorTypeCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-200 hover:shadow-2xl transition-all duration-300">

      <div className="flex items-center gap-4 mb-6">

        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
          <Sparkles size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            AI Creator Type
          </h2>

          <p className="text-slate-500">
            Generated from your uploaded content
          </p>
        </div>

      </div>

      <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
        Tech Educator
      </h1>

      <p className="text-slate-600 leading-8">
        You create educational and AI-focused content that
        simplifies complex topics. Your audience enjoys tutorials,
        project walkthroughs and practical demonstrations.
      </p>

    </div>
  );
};

export default CreatorTypeCard;