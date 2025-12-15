// artist/pages/ArtistDashboard.jsx
import React from "react";
import ArtistStats from "../components/ArtistStats";
import EarningsCard from "../components/EarningsCard";
import ArtistSongTable from "../components/ArtistSongTable";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";



const ArtistDashboard = () => {


  const { user } = React.useContext(AuthContext);
  const recentSongs = [
    { _id: 1, title: "Midnight Dreams", plays: 128450, downloads: 892, earnings: 1784, uploadedAt: new Date() },
    { _id: 2, title: "Neon Lights", plays: 98700, downloads: 620, earnings: 1240, uploadedAt: new Date() },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-purple-400">Welcome back, {user.name}!</h1>
        <p className="text-gray-400 mb-8">Here's how your music is performing</p>

        {/* Stats */}
        <ArtistStats />

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 my-8">
          <Link to="/artist/upload">
            <div className="bg-purple-600  rounded-xl p-8 text-center hover:scale-105 transition">
              <h3 className="text-2xl font-bold text-white">Upload New Song</h3>
              <p className="text-white/80 mt-2">Share your latest track</p>
            </div>
          </Link>

          <EarningsCard />
        </div>

        {/* Recent Songs */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-purple-400">Recent Uploads</h2>
          <ArtistSongTable songs={recentSongs} />
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;