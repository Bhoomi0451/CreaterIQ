import React from "react";
import { Trophy } from "lucide-react";

const CreatorScoreCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 hover:shadow-2xl transition-all">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Creator Score
          </h2>

          <p className="text-slate-500 mt-2">
            Overall AI Performance
          </p>

        </div>

        <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
          <Trophy className="text-yellow-500" size={30} />
        </div>

      </div>

      <div className="flex justify-center my-8">

        <div className="w-44 h-44 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">

          <div className="w-36 h-36 rounded-full bg-white flex flex-col items-center justify-center">

            <h1 className="text-5xl font-bold text-blue-600">
              92
            </h1>

            <span className="text-slate-500">
              /100
            </span>

          </div>

        </div>

      </div>

      <div className="bg-green-50 rounded-xl p-4 text-center">

        <p className="text-green-700 font-semibold">
          Excellent Creator Profile 🚀
        </p>

      </div>

    </div>
  );
};

export default CreatorScoreCard;