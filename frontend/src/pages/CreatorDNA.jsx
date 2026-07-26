
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaBullseye,
  FaUsers,
  FaChartLine,
  FaDna,
  FaTags,
  FaSmile,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const CreatorDNA = () => {
  const { currentUser } = useAuth();
  const [dna, setDna] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  const fetchDnaData = async () => {
    try {
      setLoading(true);
      setError("");
      setNotFound(false);

      const [dnaRes, statsRes] = await Promise.allSettled([
        api.get("/api/creator-dna"),
        api.get("/api/dashboard/stats")
      ]);

      if (dnaRes.status === "fulfilled") {
        setDna(dnaRes.value.data?.data?.creatorDNA || null);
      } else {
        const errorStatus = dnaRes.reason?.response?.status;
        if (errorStatus === 404) {
          setNotFound(true);
        } else {
          setError(dnaRes.reason?.response?.data?.message || "Failed to load Creator DNA.");
        }
      }

      if (statsRes.status === "fulfilled") {
        setStats(statsRes.value.data?.data || null);
      }
    } catch (err) {
      console.error("General error loading Creator DNA:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDnaData();
  }, []);

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      setError("");
      
      const res = await api.post("/api/creator-dna/generate");
      setDna(res.data?.data?.creatorDNA || null);
      setNotFound(false);
      
      // Reload stats to reflect updates if any
      const statsRes = await api.get("/api/dashboard/stats");
      setStats(statsRes.data?.data || null);

      alert("Creator DNA synthesized successfully! 🧬");
    } catch (err) {
      console.error("Error generating DNA:", err);
      setError(err.response?.data?.message || "Failed to generate Creator DNA. Ensure you have analyzed at least one content upload.");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100 max-w-2xl mx-auto space-y-6">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-4xl text-purple-600 mx-auto animate-pulse">
          🧬
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Synthesize Creator DNA</h2>
        <p className="text-gray-500">
          Unlock your unique creator style, tone, target audience insights, and performance traits.
          You must have at least one completed content analysis to generate your DNA.
        </p>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl text-red-700 text-sm text-left">
            ⚠️ {error}
          </div>
        )}
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow hover:scale-105 transition disabled:opacity-50 cursor-pointer"
        >
          {generating ? "Analyzing uploads & generating DNA..." : "Generate Creator DNA 🧬"}
        </button>
      </div>
    );
  }

  if (error && !dna) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100 max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-red-600">Error ⚠️</h2>
        <p className="text-gray-500">{error}</p>
        <button
          onClick={fetchDnaData}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  // Fallbacks if stats aren't loaded or computed yet
  const creativityScore = stats?.avgOverallScore || 91;
  const audienceScore = stats?.avgCaptionScore || 88;
  const growthScore = stats?.avgViralityScore || 94;

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}

      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-10 text-white shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold">🧬 Creator DNA</h1>
          <p className="mt-4 text-blue-100 text-lg max-w-3xl">
            Discover your creator personality, strengths, audience compatibility, and AI-generated growth insights.
          </p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-white/20 border border-white/30 text-white hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50 cursor-pointer"
        >
          {generating ? "Re-synthesizing..." : "Re-generate DNA"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl text-red-700 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Profile Card */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8">

        <div className="flex items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
            {currentUser?.name ? currentUser.name[0].toUpperCase() : "U"}
          </div>

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              {currentUser?.name || "Creator User"}
            </h2>

            <p className="text-gray-500 mt-2">
              {dna?.personality?.join(", ") || "Active Content Creator"}
            </p>

            <span className="inline-block mt-4 bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium">
              Rising Creator 🚀
            </span>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">

          <FaBrain className="text-4xl text-purple-600 mb-4"/>

          <h3 className="font-bold text-xl">
            AI Creativity
          </h3>

          <p className="text-4xl font-bold mt-3">
            {creativityScore}%
          </p>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">

          <FaUsers className="text-4xl text-green-600 mb-4"/>

          <h3 className="font-bold text-xl">
            Audience Match
          </h3>

          <p className="text-4xl font-bold mt-3">
            {audienceScore}%
          </p>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">

          <FaChartLine className="text-4xl text-blue-600 mb-4"/>

          <h3 className="font-bold text-xl">
            Growth Potential
          </h3>

          <p className="text-4xl font-bold mt-3">
            {growthScore}%
          </p>

        </div>

      </div>

      {/* DNA Traits details */}

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Style & Tone */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 space-y-6">
          <div className="flex items-center gap-3">
            <FaSmile className="text-purple-600 text-2xl"/>
            <h2 className="text-2xl font-bold">Style & Tone</h2>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Style Keywords:</h4>
            <div className="flex flex-wrap gap-2">
              {(dna?.style || []).map((s, i) => (
                <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg text-sm font-medium">#{s}</span>
              ))}
              {(dna?.style || []).length === 0 && <span className="text-gray-400 text-sm">No style tags generated.</span>}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Communication Tone:</h4>
            <div className="flex flex-wrap gap-2">
              {(dna?.tone || []).map((t, i) => (
                <span key={i} className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium">{t}</span>
              ))}
              {(dna?.tone || []).length === 0 && <span className="text-gray-400 text-sm">No tone tags generated.</span>}
            </div>
          </div>
        </div>

        {/* Audience & Keywords */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 space-y-6">
          <div className="flex items-center gap-3">
            <FaTags className="text-blue-600 text-2xl"/>
            <h2 className="text-2xl font-bold">Target Audience</h2>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Ideal Audience Segments:</h4>
            <div className="flex flex-wrap gap-2">
              {(dna?.targetAudience || []).map((a, i) => (
                <span key={i} className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium">{a}</span>
              ))}
              {(dna?.targetAudience || []).length === 0 && <span className="text-gray-400 text-sm">No audience segments generated.</span>}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">AI Keywords:</h4>
            <div className="flex flex-wrap gap-2">
              {(dna?.keywords || []).map((k, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium">#{k}</span>
              ))}
              {(dna?.keywords || []).length === 0 && <span className="text-gray-400 text-sm">No keywords generated.</span>}
            </div>
          </div>
        </div>

      </div>

      {/* Strengths & Weaknesses */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8">

        <div className="flex items-center gap-3 mb-6">

          <FaBullseye className="text-blue-600 text-2xl"/>

          <h2 className="text-2xl font-bold">
            Creator Strengths & Weaknesses
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg text-green-700 mb-3">✅ Strengths</h3>
            <div className="space-y-3">
              {(dna?.strengths || []).map((item, index) => (
                <div
                  key={index}
                  className="bg-green-50 rounded-xl p-4 font-medium text-gray-700"
                >
                  ⚡ {item}
                </div>
              ))}
              {(dna?.strengths || []).length === 0 && (
                <div className="text-gray-400 text-sm">No strengths list compiled.</div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-red-700 mb-3">⚠️ Weaknesses & Gaps</h3>
            <div className="space-y-3">
              {(dna?.weaknesses || []).map((item, index) => (
                <div
                  key={index}
                  className="bg-red-50 rounded-xl p-4 font-medium text-gray-700"
                >
                  🔍 {item}
                </div>
              ))}
              {(dna?.weaknesses || []).length === 0 && (
                <div className="text-gray-400 text-sm">No weaknesses list compiled.</div>
              )}
            </div>
          </div>
        </div>

      </div>

    </motion.div>
  );
};

export default CreatorDNA;