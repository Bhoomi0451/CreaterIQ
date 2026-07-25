import React from "react";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

const brands = [
  {
    name: "Nike",
    category: "Sports",
    match: 95,
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Adobe",
    category: "Technology",
    match: 91,
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Samsung",
    category: "Electronics",
    match: 87,
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Amazon",
    category: "E-Commerce",
    match: 82,
    color: "bg-orange-100 text-orange-700",
  },
];

const Brands = () => {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Hero */}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl">

        <h1 className="text-5xl font-bold">
          🤝 Brand Matches
        </h1>

        <p className="mt-4 text-blue-100 text-lg max-w-3xl">
          AI recommends brands that best match your content style,
          audience, and niche.
        </p>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 gap-6">

        {brands.map((brand, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  {brand.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  {brand.category}
                </p>

              </div>

              <FaHandshake className="text-4xl text-blue-600" />

            </div>

            <div className="mt-6">

              <div className="flex justify-between mb-2">

                <span className="font-medium">
                  Match Score
                </span>

                <span className="font-bold text-blue-600">
                  {brand.match}%
                </span>

              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">

                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{
                    width: `${brand.match}%`,
                  }}
                />

              </div>

            </div>

            <div className="flex justify-between items-center mt-6">

              <span
                className={`px-4 py-2 rounded-full font-medium ${brand.color}`}
              >
                <FaStar className="inline mr-2" />
                Recommended
              </span>

              <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition">
                View
                <FaArrowRight />
              </button>

            </div>

          </div>

        ))}

      </div>

    </motion.div>
  );
};

export default Brands;