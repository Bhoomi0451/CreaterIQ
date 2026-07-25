import React from "react";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const analyses = [
  {
    content: "Travel Reel",
    platform: "Instagram",
    score: "92%",
    status: "Excellent",
    icon: <FaInstagram className="text-pink-500" />,
  },
  {
    content: "Tech Review",
    platform: "YouTube",
    score: "88%",
    status: "Good",
    icon: <FaYoutube className="text-red-600" />,
  },
  {
    content: "Fashion Tips",
    platform: "TikTok",
    score: "81%",
    status: "Average",
    icon: <FaTiktok className="text-black" />,
  },
];

const statusStyle = {
  Excellent: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Average: "bg-yellow-100 text-yellow-700",
};

const RecentAnalysis = () => {
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

        <button className="text-blue-600 font-semibold hover:underline">
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

            {analyses.map((item, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="py-5 font-medium">
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

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RecentAnalysis;