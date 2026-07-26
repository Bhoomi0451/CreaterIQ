

import React from "react";
import { FaRobot, FaArrowTrendUp, FaClock, FaHashtag } from "react-icons/fa6";

const suggestions = [
  {
    icon: <FaArrowTrendUp />,
    title: "Improve Engagement",
    description:
      "Use stronger opening hooks to increase audience retention.",
  },
  {
    icon: <FaClock />,
    title: "Best Posting Time",
    description:
      "Post between 7 PM and 9 PM for maximum reach.",
  },
  {
    icon: <FaHashtag />,
    title: "Trending Hashtags",
    description:
      "Use #AI #CreatorIQ #TechTips #Coding for better visibility.",
  },
];

const AISuggestions = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center text-2xl">
          <FaRobot />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            AI Suggestions
          </h2>

          <p className="text-gray-500">
            Personalized recommendations to improve your content.
          </p>

        </div>

      </div>

      {/* Suggestions */}

      <div className="space-y-5">

        {suggestions.map((item, index) => (

          <div
            key={index}
            className="flex gap-5 p-5 rounded-2xl bg-slate-50 hover:bg-blue-50 transition"
          >

            <div className="text-blue-600 text-2xl mt-1">
              {item.icon}
            </div>

            <div>

              <h3 className="font-bold text-lg text-gray-800">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-1">
                {item.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AISuggestions;