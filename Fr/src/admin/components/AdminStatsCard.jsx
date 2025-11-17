// admin/components/AdminStatsCard.jsx
import React from "react";
import { FaUsers, FaMusic, FaDollarSign, FaShoppingCart } from "react-icons/fa";

const AdminStatsCard = ({ icon: Icon, title, value, change, color }) => {
  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${change > 0 ? "text-green-400" : "text-red-400"}`}>
              {change > 0 ? "+" : ""}{change}% from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
          <Icon className="text-xl text-white" />
        </div>
      </div>
    </div>
  );
};

export default AdminStatsCard;