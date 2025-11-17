// admin/components/RevenueChart.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const RevenueChart = ({ data = [] }) => {
  const chartData = data.length > 0 ? data : [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 19000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 25000 },
    { month: "May", revenue: 22000 },
    { month: "Jun", revenue: 30000 },
  ];

  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#A855F7"
              strokeWidth={3}
              dot={{ fill: "#A855F7" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
