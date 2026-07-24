import React from "react";

const analyses = [
  {
    content: "Travel Reel",
    platform: "Instagram",
    score: "85%",
    status: "Good",
  },
  {
    content: "Product Video",
    platform: "YouTube",
    score: "92%",
    status: "Viral",
  },
  {
    content: "Fashion Post",
    platform: "TikTok",
    score: "76%",
    status: "Average",
  },
];


const RecentAnalysis = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Analysis
      </h2>


      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>
            <tr className="border-b">

              <th className="py-3">
                Content
              </th>

              <th className="py-3">
                Platform
              </th>

              <th className="py-3">
                Score
              </th>

              <th className="py-3">
                Status
              </th>

            </tr>
          </thead>


          <tbody>

            {analyses.map((item, index) => (

              <tr 
                key={index}
                className="border-b"
              >

                <td className="py-3">
                  {item.content}
                </td>

                <td className="py-3">
                  {item.platform}
                </td>

                <td className="py-3 font-semibold">
                  {item.score}
                </td>

                <td className="py-3">

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
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