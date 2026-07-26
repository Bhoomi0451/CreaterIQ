import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaVideo,
} from "react-icons/fa";

const statusStyle = {
  Excellent: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Average: "bg-yellow-100 text-yellow-700",
  "Needs Work": "bg-red-100 text-red-700",
  Pending: "bg-gray-100 text-gray-700",
};

const getIcon = (platformName = "") => {
  const p = platformName.toLowerCase();
  if (p.includes("instagram") || p.includes("reel")) return <FaInstagram className="text-pink-500" />;
  if (p.includes("youtube") || p.includes("shorts")) return <FaYoutube className="text-red-600" />;
  if (p.includes("tiktok")) return <FaTiktok className="text-black" />;
  return <FaVideo className="text-gray-500" />;
};

const RecentAnalysis = ({ uploads = [] }) => {
  const navigate = useNavigate();

  const formattedAnalyses = uploads.map((upload) => {
    const hasAnalysis = !!upload.analysis;
    const score = hasAnalysis ? (upload.analysis.overallScore || 0) : 0;
    
    let status = "Pending";
    if (hasAnalysis) {
      if (score >= 90) status = "Excellent";
      else if (score >= 80) status = "Good";
      else if (score >= 70) status = "Average";
      else status = "Needs Work";
    }

    const platform = hasAnalysis && upload.analysis.platformRecommendation?.length > 0
      ? upload.analysis.platformRecommendation[0]
      : (upload.contentType || "Video");

    return {
      id: upload._id,
      content: upload.title,
      platform,
      score: hasAnalysis ? `${score}%` : "N/A",
      status,
      icon: getIcon(platform),
    };
  });

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Recent Analysis
          </h2>

          <p className="text-gray-500">
            Latest AI content reports
          </p>
        </div>

        <button 
          onClick={() => navigate("/analysis")}
          className="text-blue-600 font-semibold hover:underline cursor-pointer"
        >
          View All
        </button>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-4 text-gray-500">
                Content
              </th>

              <th className="text-left py-4 text-gray-500">
                Platform
              </th>

              <th className="text-left py-4 text-gray-500">
                Score
              </th>

              <th className="text-left py-4 text-gray-500">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {formattedAnalyses.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  No analysis records found. Upload a file to get started!
                </td>
              </tr>
            ) : (
              formattedAnalyses.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => navigate(`/analysis?id=${item.id}`)}
                >

                  <td className="py-5 font-medium max-w-[200px] truncate">
                    {item.content}
                  </td>

                  <td className="py-5">

                    <div className="flex items-center gap-2">

                      {item.icon}

                      {item.platform}

                    </div>

                  </td>

                  <td className="py-5 font-bold text-blue-600">
                    {item.score}
                  </td>

                  <td className="py-5">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${statusStyle[item.status]}`}
                    >
                      {item.status}
                    </span>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RecentAnalysis;