import React from "react";
import { Handshake } from "lucide-react";

const CollaborationCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

      <div className="flex items-center gap-3 mb-5">

        <Handshake className="text-green-600" size={28} />

        <h2 className="text-2xl font-bold">
          Collaboration Estimate
        </h2>

      </div>

      <h1 className="text-5xl font-bold text-green-600">
        ₹20K – ₹50K
      </h1>

      <p className="mt-4 text-slate-600">
        Estimated campaign value based on audience quality,
        engagement rate and creator niche.
      </p>

      <button className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
        Contact Brand
      </button>

    </div>
  );
};

export default CollaborationCard;