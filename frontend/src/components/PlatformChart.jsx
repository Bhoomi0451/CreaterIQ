import React from "react";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const platforms = [
  {
    name: "Instagram Reels",
    score: 92,
    icon: <FaInstagram className="text-pink-500 text-2xl" />,
    color: "bg-pink-500",
    status: "Excellent",
  },
  {
    name: "YouTube Shorts",
    score: 86,
    icon: <FaYoutube className="text-red-600 text-2xl" />,
    color: "bg-red-500",
    status: "Good",
  },
  {
    name: "TikTok",
    score: 78,
    icon: <FaTiktok className="text-black text-2xl" />,
    color: "bg-black",
    status: "Average",
  },
];

const PlatformChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-800">
          Platform Prediction
        </h2>

        <p className="text-gray-500 mt-1">
          AI predicts how your content may perform on each platform.
        </p>

      </div>

      <div className="space-y-8">

        {platforms.map((platform, index) => (

          <div key={index}>

            <div className="flex justify-between items-center mb-3">

              <div className="flex items-center gap-3">

                {platform.icon}

                <div>

                  <h3 className="font-semibold text-gray-800">
                    {platform.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {platform.status}
                  </p>

                </div>

              </div>

              <span className="font-bold text-lg text-blue-600">
                {platform.score}%
              </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">

              <div
                className={`${platform.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${platform.score}%` }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default PlatformChart;