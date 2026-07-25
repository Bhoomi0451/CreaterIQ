import React from "react";
import { CheckCircle } from "lucide-react";

const strengths = [
  "Strong Content Hooks",
  "Excellent Audience Engagement",
  "Consistent Posting Schedule",
  "High Retention Rate",
];

const StrengthCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 hover:shadow-2xl transition-all duration-300">

      <h2 className="text-2xl font-bold mb-6">
        💪 Creator Strengths
      </h2>

      <div className="space-y-4">

        {strengths.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-4 bg-green-50 border border-green-100 rounded-xl p-4"
          >
            <CheckCircle className="text-green-600" size={22} />

            <span className="font-medium text-slate-700">
              {item}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default StrengthCard;