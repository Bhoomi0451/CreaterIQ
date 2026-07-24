import React from "react";

const ScoreCard = ({ title, score }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="text-gray-500">
        {title}
      </h3>

      <p className="text-3xl font-bold text-blue-600 mt-3">
        {score}%
      </p>

    </div>
  );
};

export default ScoreCard;