import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaStar,
  FaArrowRight,
  FaRedoAlt,
} from "react-icons/fa";
import api from "../services/api";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [noDNA, setNoDNA] = useState(false);

  const fetchBrandData = async () => {
    try {
      setLoading(true);
      setError("");
      setNoDNA(false);

      const response = await api.get("/api/brands");
      setBrands(response.data?.data?.brands || []);
    } catch (err) {
      console.error("Error loading brand matches:", err);
      const errMsg = err.response?.data?.message || "";
      if (errMsg.toLowerCase().includes("creator dna") || err.response?.status === 400) {
        setNoDNA(true);
      } else {
        setError(errMsg || "Failed to load brand recommendations.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrandData();
  }, []);

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      setError("");
      setNoDNA(false);

      const response = await api.post("/api/brands/generate");
      setBrands(response.data?.data?.brands || []);
      alert("Brand matches generated successfully! 🤝");
    } catch (err) {
      console.error("Error generating brand recommendations:", err);
      const errMsg = err.response?.data?.message || "";
      if (errMsg.toLowerCase().includes("creator dna")) {
        setNoDNA(true);
      } else {
        setError(errMsg || "Failed to generate brand recommendations. Ensure you have synthesized Creator DNA first.");
      }
    } finally {
      setGenerating(false);
    }
  };

  const getMatchColor = (match) => {
    if (match >= 90) return "bg-green-100 text-green-700";
    if (match >= 80) return "bg-blue-100 text-blue-700";
    if (match >= 70) return "bg-purple-100 text-purple-700";
    return "bg-orange-100 text-orange-700";
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (noDNA) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100 max-w-2xl mx-auto space-y-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl text-blue-600 mx-auto">
          🧬
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Creator DNA Required</h2>
        <p className="text-gray-500">
          We need your Creator DNA profile to match you with compatible brands.
          Please visit the Creator DNA section and generate your profile first.
        </p>
        <button
          onClick={() => window.location.href = "/creator-dna"}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition cursor-pointer"
        >
          Go to Creator DNA
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Hero */}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold">🤝 Brand Matches</h1>
          <p className="mt-4 text-blue-100 text-lg max-w-3xl">
            AI recommends brands that best match your content style, audience, and niche.
          </p>
        </div>
        {brands.length > 0 && (
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 bg-white/20 border border-white/30 text-white hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50 cursor-pointer animate-fade-in"
          >
            <FaRedoAlt className={generating ? "animate-spin" : ""} />
            {generating ? "Matching..." : "Re-match Brands"}
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl text-red-700 font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Cards & Content */}

      {brands.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-md border border-gray-100 max-w-xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">No Brand Matches Yet</h2>
          <p className="text-gray-500">
            Let our AI scan your profile and connect you with sponsorships.
          </p>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-50 cursor-pointer"
          >
            {generating ? "Synthesizing Sponsorships..." : "Find Brand Matches"}
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {brands.map((brand, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition flex flex-col justify-between"
            >

              <div>
                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800">
                      {brand.brandName}
                    </h2>

                    <p className="text-gray-500 mt-1 font-semibold text-sm">
                      Est. Sponsorship: <span className="text-green-600 font-bold">{brand.estimatedSponsorship || "N/A"}</span>
                    </p>

                  </div>

                  <FaHandshake className="text-4xl text-blue-600" />

                </div>

                <div className="mt-6">

                  <div className="flex justify-between mb-2">

                    <span className="font-medium text-gray-600">
                      Match Score
                    </span>

                    <span className="font-bold text-blue-600">
                      {brand.matchPercentage}%
                    </span>

                  </div>

                  <div className="w-full bg-gray-200 h-3 rounded-full">

                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{
                        width: `${brand.matchPercentage}%`,
                      }}
                    />

                  </div>

                </div>

                {brand.reason && (
                  <p className="text-sm text-gray-600 mt-5 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                    💡 <strong>AI Insights:</strong> {brand.reason}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">

                <span
                  className={`px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-1.5 ${getMatchColor(brand.matchPercentage)}`}
                >
                  <FaStar className="inline" />
                  Recommended
                </span>

                <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition">
                  Apply Sponsor
                  <FaArrowRight />
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </motion.div>
  );
};

export default Brands;