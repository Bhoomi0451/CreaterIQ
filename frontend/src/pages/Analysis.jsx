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

      {/* Consultant Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Niche & Audience Profile */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 border-b pb-4">
            🎯 Niche & Audience Profile
          </h3>
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Content Category</span>
              <p className="text-lg font-bold text-blue-600 mt-0.5">{analysis.contentCategory || "N/A"}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Target Audience</span>
              <p className="text-gray-700 font-medium mt-0.5">{analysis.targetAudience || "N/A"}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Optimal Posting Time</span>
              <p className="text-gray-700 font-medium mt-0.5 flex items-center gap-2">
                ⏰ {analysis.bestPostingTime || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Viral Title Suggestions */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 border-b pb-4">
            🔥 Viral Title Alternatives
          </h3>
          <ul className="space-y-3">
            {analysis.viralTitleSuggestions && analysis.viralTitleSuggestions.length > 0 ? (
              analysis.viralTitleSuggestions.map((title, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-gray-800 font-medium">{title}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No viral titles generated.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Strengths */}
        <div className="bg-emerald-50/55 rounded-3xl shadow-lg border border-emerald-100 p-8 space-y-5">
          <h3 className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
            ✅ Key Strengths
          </h3>
          <ul className="space-y-2.5">
            {analysis.strengths && analysis.strengths.length > 0 ? (
              analysis.strengths.map((str, idx) => (
                <li key={idx} className="flex gap-2 text-emerald-700 font-medium items-start">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>{str}</span>
                </li>
              ))
            ) : (
              <li className="text-emerald-500 italic">No strengths listed.</li>
            )}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-rose-50/55 rounded-3xl shadow-lg border border-rose-100 p-8 space-y-5">
          <h3 className="text-2xl font-bold text-rose-800 flex items-center gap-2">
            ⚠️ Content Gaps / Weaknesses
          </h3>
          <ul className="space-y-2.5">
            {analysis.weaknesses && analysis.weaknesses.length > 0 ? (
              analysis.weaknesses.map((weak, idx) => (
                <li key={idx} className="flex gap-2 text-rose-700 font-medium items-start">
                  <span className="text-rose-500 mt-1">•</span>
                  <span>{weak}</span>
                </li>
              ))
            ) : (
              <li className="text-rose-500 italic">No weaknesses listed.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Optimized Caption Copy Box */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              💡 Upgraded Post Caption
            </h3>
            <p className="text-gray-500 text-sm mt-0.5">High-converting caption optimized by Creator AI</p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(analysis.betterCaption || "");
              alert("Caption copied to clipboard! 📋");
            }}
            className="self-start bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition cursor-pointer text-sm shadow flex items-center gap-2"
          >
            Copy Caption
          </button>
        </div>
        
        {analysis.betterCaption ? (
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5 whitespace-pre-wrap text-gray-700 leading-relaxed font-mono text-sm max-h-[300px] overflow-y-auto">
            {analysis.betterCaption}
          </div>
        ) : (
          <p className="text-gray-500 italic">No custom caption generated.</p>
        )}

        {/* Suggested Hashtags */}
        {analysis.suggestedHashtags && analysis.suggestedHashtags.length > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Suggested Hashtags</span>
            <div className="flex flex-wrap gap-2">
              {analysis.suggestedHashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-50 text-blue-600 border border-blue-100 font-semibold px-3 py-1.5 rounded-xl text-xs"
                >
                  {tag.startsWith("#") ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

    </motion.div>
  );
};

export default Analysis;