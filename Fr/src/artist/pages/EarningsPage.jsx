// artist/pages/EarningsPage.jsx
import React, { useState } from "react";
import EarningsCard from "../components/EarningsCard";
import PayoutModal from "../components/PayoutModal";
import RevenueChart from "../../admin/components/RevenueChart";

const EarningsPage = () => {
  const [showPayout, setShowPayout] = useState(false);

  const monthlyData = [
    { month: "Jan", earnings: 2400 },
    { month: "Feb", earnings: 3200 },
    { month: "Mar", earnings: 2800 },
    { month: "Apr", earnings: 4100 },
    { month: "May", earnings: 3800 },
    { month: "Jun", earnings: 4500 },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-purple-400">Earnings</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <EarningsCard onRequestPayout={() => setShowPayout(true)} />
          <div className="md:col-span-2">
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Earnings</h3>
              <RevenueChart data={monthlyData} />
            </div>
          </div>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Payout History</h3>
          <div className="space-y-3">
            {["June 2025", "May 2025", "April 2025"].map((month) => (
              <div key={month} className="flex justify-between items-center py-3 border-b border-gray-700 last:border-0">
                <span className="text-gray-300">{month}</span>
                <span className="text-green-400 font-medium">$4,500</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PayoutModal isOpen={showPayout} onClose={() => setShowPayout(false)} />
    </div>
  );
};

export default EarningsPage;