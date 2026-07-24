import React from "react";

import ScoreCard from "../components/ScoreCard";
import RecommendationCard from "../components/RecommendationCard";
import PlatformChart from "../components/PlatformChart";


const Analysis = () => {

  return (
    <div className="min-h-screen bg-gray-100 p-8">


      <h1 className="text-3xl font-bold">
        AI Analysis Report 🤖
      </h1>


      <p className="text-gray-500 mt-2 mb-8">
        AI-powered insights for your content performance.
      </p>



      {/* Score Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">


        <ScoreCard
          title="Content Score"
          score={85}
        />


        <ScoreCard
          title="Virality Score"
          score={78}
        />


        <ScoreCard
          title="Hook Strength"
          score={90}
        />


        <ScoreCard
          title="Audience Match"
          score={82}
        />


      </div>



      <RecommendationCard />


      <PlatformChart />


    </div>
  );
};


export default Analysis;