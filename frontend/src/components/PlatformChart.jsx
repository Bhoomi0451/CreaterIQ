import React from "react";

const platforms = [
  {
    name: "Instagram Reels",
    score: 85,
  },
  {
    name: "YouTube Shorts",
    score: 70,
  },
  {
    name: "TikTok",
    score: 75,
  },
];


const PlatformChart = () => {

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-xl font-bold mb-5">
        Platform Prediction
      </h2>


      {platforms.map((platform, index) => (

        <div key={index} className="mb-4">

          <div className="flex justify-between mb-2">

            <span>
              {platform.name}
            </span>

            <span>
              {platform.score}%
            </span>

          </div>


          <div className="w-full bg-gray-200 rounded-full h-3">

            <div
              className="bg-blue-600 h-3 rounded-full"
              style={{
                width: `${platform.score}%`
              }}
            >
            </div>

          </div>

        </div>

      ))}


    </div>
  );
};


export default PlatformChart;