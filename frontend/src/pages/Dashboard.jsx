
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
import api from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [overview, setOverview] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [overviewRes, statsRes] = await Promise.all([
          api.get('/api/dashboard'),
          api.get('/api/dashboard/stats')
        ]);
        
        setOverview(overviewRes.data?.data || {});
        setStats(statsRes.data?.data || {});
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-2xl text-red-700 font-medium">
        ⚠️ {error}
      </div>
    );
  }

  // Formulate data for the Performance Chart (reverse to make chronological)
  const chartData = (overview?.recentUploads || [])
    .filter(u => u.analysis)
    .map(u => ({
      name: u.title.length > 12 ? u.title.substring(0, 12) + "..." : u.title,
      score: u.analysis.overallScore || 0,
    }))
    .reverse();

  // Extract suggestions from the latest upload analysis
  const latestUploadWithAnalysis = (overview?.recentUploads || []).find(u => u.analysis);
  const suggestions = latestUploadWithAnalysis?.analysis?.improvementSuggestions || [];

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

          <button 
            onClick={() => navigate("/analysis")}
            className="mt-6 lg:mt-0 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition cursor-pointer"
          >
            View Reports
          </button>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Creator Score"
          value={String(stats?.avgOverallScore || 0)}
          icon={<FaStar />}
          color="bg-blue-600"
        />

        <StatCard
          title="Virality Score"
          value={`${stats?.avgViralityScore || 0}%`}
          icon={<FaFire />}
          color="bg-orange-500"
        />

        <StatCard
          title="Brand Matches"
          value={String(overview?.recentBrands?.length || 0)}
          icon={<FaHandshake />}
          color="bg-green-600"
        />

        <StatCard
          title="AI Reports"
          value={String(stats?.totalAnalyses || 0)}
          icon={<FaFileAlt />}
          color="bg-purple-600"
        />

      </div>

      {/* Chart */}

      <PerformanceChart data={chartData} />

      {/* Bottom Cards */}

      <div className="grid lg:grid-cols-2 gap-8">

        <AISuggestions suggestions={suggestions} />

        <RecentAnalysis uploads={overview?.recentUploads || []} />

      </div>

    </motion.div>
  );
};

export default Dashboard;