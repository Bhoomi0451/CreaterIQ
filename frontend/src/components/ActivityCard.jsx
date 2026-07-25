import React from "react";

const activities = [
  "Uploaded AI Tutorial Reel",
  "Received 3 Brand Matches",
  "Creator Score increased to 92",
  "Generated AI Report",
];

const ActivityCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((item, index) => (

          <div
            key={index}
            className="bg-slate-100 rounded-xl p-4"
          >
            ✅ {item}
          </div>

        ))}

      </div>

    </div>
  );
};

export default ActivityCard;