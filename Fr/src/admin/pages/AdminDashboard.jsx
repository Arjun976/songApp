// admin/pages/AdminDashboard.jsx
import React from "react";
import { FaUsers, FaMusic, FaDollarSign, FaShoppingCart } from "react-icons/fa";
import AdminStatsCard from "../components/AdminStatsCard";
import RevenueChart from "../components/RevenueChart";
import PaymentLogsTable from "../components/PaymentLogsTable";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Users", value: "12,450", change: 12, icon: FaUsers, color: "bg-purple-600" },
    { title: "Active Artists", value: "1,234", change: 8, icon: FaMusic, color: "bg-green-600" },
    { title: "Total Revenue", value: "$45,230", change: 15, icon: FaDollarSign, color: "bg-yellow-500" },
    { title: "Premium Downloads", value: "892", change: -5, icon: FaShoppingCart, color: "bg-pink-600" },
  ];

  const recentPayments = [
    { _id: 1, transactionId: "txn_123", user: { name: "John" }, song: { title: "Midnight" }, amount: 199, createdAt: new Date() },
    // ... more
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-purple-400">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <AdminStatsCard key={i} {...stat} />
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="mb-8">
        <RevenueChart />
      </div>

      {/* Recent Payments */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-purple-400">Recent Payments</h2>
        <PaymentLogsTable payments={recentPayments} />
      </div>
    </div>
  );
};

export default AdminDashboard;