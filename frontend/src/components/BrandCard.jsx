import React from "react";
import { Building2 } from "lucide-react";

const BrandCard = ({ brand, match, color }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-4">

          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${color}`}
          >
            <Building2 size={28} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {brand}
            </h2>

            <p className="text-slate-500">
              AI Compatibility
            </p>
          </div>

        </div>

        <span className="text-2xl font-bold text-blue-600">
          {match}%
        </span>

      </div>

      <div className="mt-6 w-full h-3 bg-slate-200 rounded-full">

        <div
          className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
          style={{ width: `${match}%` }}
        />

      </div>

    </div>
  );
};

export default BrandCard;