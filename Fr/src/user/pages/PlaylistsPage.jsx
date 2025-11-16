// src/user/pages/PlaylistsPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import PlaylistCard from "../components/PlaylistCard";  // CORRECT PATH
import Button from "../../components/ui/Button";       // UI components from global

const PlaylistsPage = () => {
  const playlists = [
    { _id: 1, name: "Chill Vibes", songs: 24 },
    { _id: 2, name: "Workout Mix", songs: 18 },
    { _id: 3, name: "Late Night", songs: 15 },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Playlists</h1>
          <Button>Create Playlist</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistsPage;