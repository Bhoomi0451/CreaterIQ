import React from "react";

const AudienceCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 border">

      <h2 className="text-2xl font-bold mb-6">
        🎯 Audience Insights
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Age Group</span>
          <span className="font-bold">18 - 30</span>
        </div>

        <div className="flex justify-between">
          <span>Primary Audience</span>
          <span className="font-bold">Students</span>
        </div>

        <div className="flex justify-between">
          <span>Region</span>
          <span className="font-bold">India</span>
        </div>

        <div className="flex justify-between">
          <span>Interest</span>
          <span className="font-bold">AI & Coding</span>
        </div>

      </div>

    </div>
  );
};

export default AudienceCard;