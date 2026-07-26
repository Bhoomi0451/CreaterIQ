
import React from "react";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaBullseye,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const strengths = [
  "Strong storytelling",
  "Excellent audience engagement",
  "Consistent posting schedule",
  "High retention in first 10 seconds",
];

const CreatorDNA = () => {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}

      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-10 text-white shadow-xl">

        <h1 className="text-5xl font-bold">
          🧬 Creator DNA
        </h1>

        <p className="mt-4 text-blue-100 text-lg max-w-3xl">
          Discover your creator personality, strengths,
          audience compatibility and AI-generated growth insights.
        </p>

      </div>

      {/* Profile Card */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8">

        <div className="flex items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
            A
          </div>

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              Amisha Patel
            </h2>

            <p className="text-gray-500 mt-2">
              Tech Content Creator
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
            91%
          </p>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">

          <FaUsers className="text-4xl text-green-600 mb-4"/>

          <h3 className="font-bold text-xl">
            Audience Match
          </h3>

          <p className="text-4xl font-bold mt-3">
            88%
          </p>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">

          <FaChartLine className="text-4xl text-blue-600 mb-4"/>

          <h3 className="font-bold text-xl">
            Growth Potential
          </h3>

          <p className="text-4xl font-bold mt-3">
            94%
          </p>

        </div>

      </div>

      {/* Strengths */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8">

        <div className="flex items-center gap-3 mb-6">

          <FaBullseye className="text-blue-600 text-2xl"/>

          <h2 className="text-2xl font-bold">
            Creator Strengths
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          {strengths.map((item, index) => (

            <div
              key={index}
              className="bg-blue-50 rounded-xl p-4 font-medium text-gray-700 hover:bg-blue-100 transition"
            >
              ✅ {item}
            </div>

          ))}

        </div>

      </div>

    </motion.div>
  );
};

export default CreatorDNA;