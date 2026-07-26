
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

const PerformanceChart = ({ data = [] }) => {
  const defaultData = [
    { name: "Upload 1", score: 0 },
    { name: "Upload 2", score: 0 },
    { name: "Upload 3", score: 0 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Performance Overview
          </h2>

          <p className="text-gray-500 mt-1">
            Historical AI performance score
          </p>

        </div>

        {data.length > 0 && (
          <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
            Dynamic
          </span>
        )}

      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis domain={[0, 100]} />

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