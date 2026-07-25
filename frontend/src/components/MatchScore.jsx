import React from "react";

const MatchScore = ({ score }) => {

  return (
    <div className="mt-4">

      <div className="flex justify-between mb-2">

        <span>
          Brand Compatibility
        </span>

        <span className="font-semibold">
          {score}%
        </span>

      </div>


      <div className="w-full bg-gray-200 rounded-full h-3">

        <div
          className="bg-purple-600 h-3 rounded-full"
          style={{
            width: `${score}%`
          }}
        >
        </div>

      </div>

    </div>
  );
};

export default MatchScore;