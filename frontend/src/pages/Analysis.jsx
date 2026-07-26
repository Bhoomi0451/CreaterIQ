import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";

import ScoreCard from "../components/ScoreCard";
import RecommendationCard from "../components/RecommendationCard";
import PlatformChart from "../components/PlatformChart";
import api from "../services/api";

const Analysis = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const uploadId = searchParams.get("id");

  const [analysis, setAnalysis] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noReports, setNoReports] = useState(false);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        setLoading(true);
        setError("");
        setNoReports(false);

        let activeUploadId = uploadId;

        // 1) If no ID parameter, search for latest upload that has been processed
        if (!activeUploadId) {
          const uploadsRes = await api.get("/api/uploads");
          const uploads = uploadsRes.data?.data?.uploads || [];

          if (uploads.length === 0) {
            setNoReports(true);
            setLoading(false);
            return;
          }

          // Pick the first upload (the backend returns uploads, we pick the most recent one)
          activeUploadId = uploads[0]._id;
          setUploadTitle(uploads[0].title);
        }

        // 2) Fetch specific analysis report
        const analysisRes = await api.get(`/api/analysis/${activeUploadId}`);
        setAnalysis(analysisRes.data?.data?.analysis || null);

        // Fetch upload metadata for name if we had the ID in the URL
        if (uploadId) {
          const uploadRes = await api.get(`/api/uploads/${uploadId}`);
          setUploadTitle(uploadRes.data?.data?.upload?.title || "AI Analysis Report");
        }
      } catch (err) {
        console.error("Analysis loading error:", err);
        setError(err.response?.data?.message || "Failed to load AI Analysis report.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, [uploadId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (noReports) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100 max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">No Reports Found 📊</h2>
        <p className="text-gray-500">
          You haven't run any AI content analyses yet. Upload an image or video to get insights.
        </p>
        <button
          onClick={() => navigate("/upload")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow hover:scale-105 transition cursor-pointer"
        >
          Go to Upload
        </button>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100 max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-red-600">Error ⚠️</h2>
        <p className="text-gray-500">
          {error || "Analysis report not found for this content. Try running the analysis again."}
        </p>
        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition cursor-pointer"
        >
          Go to Upload
        </button>
      </div>
    );
  }

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
          AI analyzed: <strong className="text-white">"{uploadTitle}"</strong>.
        </p>

        {analysis.engagementPrediction && (
          <p className="mt-4 p-4 bg-white/10 rounded-2xl text-white border border-white/10 text-sm leading-relaxed">
            💡 <strong>AI Prediction:</strong> {analysis.engagementPrediction}
          </p>
        )}

      </div>

      {/* Score Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <ScoreCard
          title="Content Score"
          score={analysis.storytellingScore || analysis.overallScore || 0}
        />

        <ScoreCard
          title="Virality Score"
          score={analysis.viralityScore || 0}
        />

        <ScoreCard
          title="Hook Strength"
          score={analysis.hookScore || 0}
        />

        <ScoreCard
          title="Audience Match"
          score={analysis.captionScore || analysis.thumbnailScore || 0}
        />

      </div>

      {/* Recommendation */}

      <RecommendationCard suggestions={analysis.improvementSuggestions} />

      {/* Chart */}

      <PlatformChart 
        platforms={analysis.platformRecommendation} 
        score={analysis.overallScore} 
      />

    </motion.div>
  );
};

export default Analysis;