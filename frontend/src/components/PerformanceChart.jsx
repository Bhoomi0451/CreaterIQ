import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const data = [
  {
    month: "Jan",
    score: 40,
  },
  {
    month: "Feb",
    score: 55,
  },
  {
    month: "Mar",
    score: 65,
  },
  {
    month: "Apr",
    score: 78,
  },
  {
    month: "May",
    score: 90,
  },
];


const PerformanceChart = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Performance Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default PerformanceChart;