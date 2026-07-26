
import React from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaFire,
  FaHandshake,
  FaFileAlt,
} from "react-icons/fa";

import StatCard from "../components/StatCard";
import PerformanceChart from "../components/PerformanceChart";
import AISuggestions from "../components/AISuggestions";
import RecentAnalysis from "../components/RecentAnalysis";

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Hero Section */}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex flex-col lg:flex-row justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Dashboard 📊
            </h1>

            <p className="mt-3 text-blue-100 text-lg max-w-2xl">
              Welcome back! Monitor your creator growth,
              AI insights, engagement, and brand opportunities
              all in one place.
            </p>

          </div>

          <button className="mt-6 lg:mt-0 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
            View Reports
          </button>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Creator Score"
          value="92"
          icon={<FaStar />}
          color="bg-blue-600"
        />

        <StatCard
          title="Virality Score"
          value="84%"
          icon={<FaFire />}
          color="bg-orange-500"
        />

        <StatCard
          title="Brand Matches"
          value="18"
          icon={<FaHandshake />}
          color="bg-green-600"
        />

        <StatCard
          title="AI Reports"
          value="36"
          icon={<FaFileAlt />}
          color="bg-purple-600"
        />

      </div>

      {/* Chart */}

      <PerformanceChart />

      {/* Bottom Cards */}

      <div className="grid lg:grid-cols-2 gap-8">

        <AISuggestions />

        <RecentAnalysis />

      </div>

    </motion.div>
  );
};

export default Dashboard;