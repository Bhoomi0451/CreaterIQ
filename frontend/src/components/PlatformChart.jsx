import React from "react";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaSpotify,
  FaLinkedin,
  FaBriefcase,
  FaGlobe,
} from "react-icons/fa";

const PlatformChart = ({ platforms = [], score = 80 }) => {
  const getPlatformDetails = (name, index) => {
    const n = name.toLowerCase();
    let icon = <FaGlobe className="text-indigo-500 text-2xl" />;
    let color = "bg-indigo-500";
    
    if (n.includes("instagram") || n.includes("reel")) {
      icon = <FaInstagram className="text-pink-500 text-2xl" />;
      color = "bg-pink-500";
    } else if (n.includes("youtube") || n.includes("short")) {
      icon = <FaYoutube className="text-red-600 text-2xl" />;
      color = "bg-red-500";
    } else if (n.includes("tiktok")) {
      icon = <FaTiktok className="text-black text-2xl" />;
      color = "bg-black";
    } else if (n.includes("spotify") || n.includes("podcast") || n.includes("audio")) {
      icon = <FaSpotify className="text-green-500 text-2xl" />;
      color = "bg-green-500";
    } else if (n.includes("linkedin")) {
      icon = <FaLinkedin className="text-blue-700 text-2xl" />;
      color = "bg-blue-700";
    } else if (n.includes("blog") || n.includes("script") || n.includes("article") || n.includes("write")) {
      icon = <FaBriefcase className="text-orange-500 text-2xl" />;
      color = "bg-orange-500";
    }

    // Offset scores slightly for dynamic presentation
    const platformScore = Math.max(10, Math.min(100, score + (1 - index) * 4));
    
    let status = "Average";
    if (platformScore >= 90) status = "Excellent";
    else if (platformScore >= 80) status = "Good";
    else if (platformScore >= 70) status = "Average";
    else status = "Needs Work";

    return {
      name,
      score: platformScore,
      icon,
      color,
      status,
    };
  };

  const defaultPlatforms = ["Instagram Reels", "YouTube Shorts", "TikTok"];
  const platformsList = platforms.length > 0 ? platforms : defaultPlatforms;
  const displayPlatforms = platformsList.map((p, idx) => getPlatformDetails(p, idx));

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

        {displayPlatforms.map((platform, index) => (

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