import React from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaFire,
  FaBolt,
  FaUsers,
} from "react-icons/fa";

const icons = {
  "Content Score": <FaChartLine />,
  "Virality Score": <FaFire />,
  "Hook Strength": <FaBolt />,
  "Audience Match": <FaUsers />,
};

const ScoreCard = ({ title, score }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl"
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            {score}%
          </h2>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
          {icons[title]}
        </div>

      </div>

      <div className="mt-6">

        <div className="w-full h-2 bg-gray-200 rounded-full">

          <div
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
            style={{
              width: `${score}%`,
            }}
          />

        </div>

      </div>

      <p className="mt-4 text-sm text-gray-500">
        Updated just now
      </p>

    </motion.div>
  );
};

export default ScoreCard;