
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", score: 45 },
  { month: "Feb", score: 58 },
  { month: "Mar", score: 72 },
  { month: "Apr", score: 80 },
  { month: "May", score: 91 },
  { month: "Jun", score: 95 },
];

const PerformanceChart = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Performance Overview
          </h2>

          <p className="text-gray-500 mt-1">
            Monthly AI performance score
          </p>

        </div>

        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
          +18%
        </span>

      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#2563eb"
            strokeWidth={4}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default PerformanceChart;