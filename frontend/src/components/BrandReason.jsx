import React from "react";


const reasons = [
  "Audience overlap is high",
  "Your content style matches this brand",
  "Engagement rate fits brand goals",
];


const BrandReason = () => {

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Why this brand matches you 🤝
      </h2>


      <div className="space-y-3">

        {reasons.map((reason, index) => (

          <div
            key={index}
            className="bg-green-50 p-3 rounded-lg"
          >
            ✓ {reason}
          </div>

        ))}

      </div>


    </div>
  );
};


export default BrandReason;