// artist/pages/MySongsPage.jsx
import React from "react";
import ArtistSongTable from "../components/ArtistSongTable";
import Button from "../../components/ui/Button";

const MySongsPage = () => {
  const songs = [
    { _id: 1, title: "Midnight Dreams", plays: 128450, downloads: 892, earnings: 1784, uploadedAt: new Date() },
    { _id: 2, title: "Neon Lights", plays: 98700, downloads: 620, earnings: 1240, uploadedAt: new Date() },
    { _id: 3, title: "Echoes", plays: 45000, downloads: 310, earnings: 620, uploadedAt: new Date() },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-400">My Songs</h1>
          <Button>Export Earnings</Button>
        </div>
        <ArtistSongTable songs={songs} />
      </div>
    </div>
  );
};

export default MySongsPage;