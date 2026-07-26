import React from "react";

const data = [
  { name: "Instagram", score: 95 },
  { name: "YouTube", score: 90 },
  { name: "LinkedIn", score: 82 },
];

const PlatformMatch = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-6 border">

      <h2 className="text-2xl font-bold mb-6">
        🚀 Best Platform Match
      </h2>

      {data.map((item, index) => (

        <div key={index} className="mb-5">

          <div className="flex justify-between mb-2">
            <span>{item.name}</span>
            <span>{item.score}%</span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full">

            <div
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
              style={{ width: `${item.score}%` }}
            />

          </div>

        </div>

      ))}

    </div>
  );
};

export default PlatformMatch;