import React from "react";

const recommendations = [
  "Improve your opening hook",
  "Use trending keywords",
  "Post during peak audience time",
];


const RecommendationCard = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        AI Recommendations 🤖
      </h2>


      <div className="space-y-3">

        {recommendations.map((item, index) => (

          <div
            key={index}
            className="bg-blue-50 p-4 rounded-lg"
          >
            💡 {item}
          </div>

        ))}

      </div>

    </div>
  );
};

export default RecommendationCard;