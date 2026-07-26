import React from "react";
import { motion } from "framer-motion";

import ScoreCard from "../components/ScoreCard";
import RecommendationCard from "../components/RecommendationCard";
import PlatformChart from "../components/PlatformChart";

const Analysis = () => {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}

      <div className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 rounded-3xl p-10 text-white shadow-xl">

        <h1 className="text-5xl font-bold">
          🤖 AI Analysis Report
        </h1>

        <p className="mt-4 text-lg text-blue-100 max-w-3xl">
          Our AI analyzed your uploaded content and generated
          performance predictions, engagement insights and
          personalized recommendations.
        </p>

      </div>

      {/* Score Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <ScoreCard
          title="Content Score"
          score={92}
        />

        <ScoreCard
          title="Virality Score"
          score={87}
        />

        <ScoreCard
          title="Hook Strength"
          score={90}
        />

        <ScoreCard
          title="Audience Match"
          score={84}
        />

      </div>

      {/* Recommendation */}

      <RecommendationCard />

      {/* Chart */}

      <PlatformChart />

    </motion.div>
  );
};

export default Analysis;