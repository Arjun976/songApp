// admin/pages/RevenuePage.jsx
import React from "react";
import RevenueChart from "../components/RevenueChart";
import PaymentLogsTable from "../components/PaymentLogsTable";
import AdminStatsCard from "../components/AdminStatsCard";
import { FaDollarSign, FaCreditCard, FaChartLine } from "react-icons/fa";

const RevenuePage = () => {
  const payments = [
    { _id: 1, transactionId: "txn_123", user: { name: "Alex" }, song: { title: "Echoes" }, amount: 299, createdAt: new Date() },
    // ... more
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-purple-400">Revenue</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AdminStatsCard title="Total Revenue" value="$45,230" icon={FaDollarSign} color="bg-green-600" />
        <AdminStatsCard title="This Month" value="$8,120" icon={FaChartLine} color="bg-blue-600" />
        <AdminStatsCard title="Transactions" value="1,892" icon={FaCreditCard} color="bg-purple-600" />
      </div>

      <div className="mb-8">
        <RevenueChart data={[
          { month: "Jan", revenue: 12000 },
          { month: "Feb", revenue: 19000 },
          // ... full year
        ]} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-purple-400">Payment Logs</h2>
        <PaymentLogsTable payments={payments} />
      </div>
    </div>
  );
};

export default RevenuePage;