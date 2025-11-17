// artist/components/ArtistStats.jsx
import React from "react";
import { FaPlay, FaDownload, FaHeart, FaDollarSign } from "react-icons/fa";

const ArtistStats = () => {
  const stats = [
    { label: "Total Plays", value: "1.2M", icon: FaPlay, color: "text-purple-400" },
    { label: "Downloads", value: "8,420", icon: FaDownload, color: "text-green-400" },
    { label: "Favorites", value: "45.1K", icon: FaHeart, color: "text-red-400" },
    { label: "Earnings", value: "$12,450", icon: FaDollarSign, color: "text-yellow-400" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-5 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
            <stat.icon className={`text-3xl ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtistStats;