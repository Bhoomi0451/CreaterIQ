import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaRobot,
  FaChartLine,
  FaBrain,
  FaHandshake,
  FaArrowRight,
  FaUpload,
  FaUsers,
  FaStar,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBrain className="text-4xl text-blue-600" />,
    title: "AI Analysis",
    desc: "Analyze your content using powerful AI insights.",
  },
  {
    icon: <FaChartLine className="text-4xl text-green-600" />,
    title: "Performance Tracking",
    desc: "Track growth and engagement across platforms.",
  },
  {
    icon: <FaRobot className="text-4xl text-purple-600" />,
    title: "Creator DNA",
    desc: "Discover your creator personality with AI.",
  },
  {
    icon: <FaHandshake className="text-4xl text-orange-600" />,
    title: "Brand Matching",
    desc: "Get matched with brands that fit your niche.",
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
              🚀 AI Powered Creator Platform
            </span>

            <h1 className="text-6xl font-extrabold mt-8 leading-tight text-gray-900">

              Unlock Your

              <span className="text-blue-600">
                {" "}Creator Potential
              </span>

            </h1>

            <p className="mt-8 text-gray-600 text-lg leading-8">

              Upload your content, receive AI-powered insights,
              discover your Creator DNA, predict virality and
              connect with brands that match your audience.

            </p>

            <div className="flex gap-5 mt-10">

              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2"
              >
                Get Started
                <FaArrowRight />
              </Link>

              <Link
                to="/dashboard"
                className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50"
              >
                Explore Dashboard
              </Link>

            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-white shadow-2xl"
          >

            <FaRobot className="text-8xl mb-8" />

            <h2 className="text-4xl font-bold">
              AI Creator Assistant
            </h2>

            <p className="mt-6 text-blue-100">

              Analyze videos, reels and posts with AI.
              Improve engagement and grow faster.

            </p>

          </motion.div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-8 py-20">

        <h2 className="text-4xl font-bold text-center">
          Everything You Need
        </h2>

        <p className="text-center text-gray-500 mt-3">
          Smart tools built for creators.
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-14">

          {features.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition"
            >

              {item.icon}

              <h3 className="text-2xl font-bold mt-6">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-4">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-8">

          <h2 className="text-4xl font-bold text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16">

            <div className="text-center">

              <FaUpload className="text-5xl text-blue-600 mx-auto"/>

              <h3 className="font-bold text-2xl mt-5">
                Upload
              </h3>

              <p className="text-gray-500 mt-3">
                Upload reels, videos or images.
              </p>

            </div>

            <div className="text-center">

              <FaBrain className="text-5xl text-purple-600 mx-auto"/>

              <h3 className="font-bold text-2xl mt-5">
                AI Analysis
              </h3>

              <p className="text-gray-500 mt-3">
                AI evaluates quality and engagement.
              </p>

            </div>

            <div className="text-center">

              <FaChartLine className="text-5xl text-green-600 mx-auto"/>

              <h3 className="font-bold text-2xl mt-5">
                Grow
              </h3>

              <p className="text-gray-500 mt-3">
                Improve performance with insights.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="bg-blue-600 text-white py-20">

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">

          <div>
            <h2 className="text-5xl font-bold">15K+</h2>
            <p className="mt-3">Creators</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">50K+</h2>
            <p className="mt-3">Content Analyses</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">500+</h2>
            <p className="mt-3">Brand Matches</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">98%</h2>
            <p className="mt-3">AI Accuracy</p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24">

        <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-16 text-center text-white">

          <h2 className="text-5xl font-bold">
            Ready to Grow?
          </h2>

          <p className="mt-5 text-blue-100 text-lg">
            Join CreatorIQ and start analyzing your content today.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-10 bg-white text-blue-700 px-10 py-4 rounded-xl font-bold"
          >
            Get Started Free
          </Link>

        </div>

      </section>

    </div>
  );
};

export default Home;