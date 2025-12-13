// src/pages/PlayerPage.jsx
import React, { useState } from "react";
import { useMusic } from "../context/MusicContext";
import { FaChevronDown, FaPlay, FaPause, FaRedo, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AddToPlaylistModal from "../user/components/AddToPlaylistModal";

const PlayerPage = () => {
  const { currentSong, isPlaying, togglePlay, isRepeating, toggleRepeat } = useMusic();
  const navigate = useNavigate();
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);

  if (!currentSong) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p>No song is currently playing.</p>
        <Link to="/" className="text-purple-400 ml-2">
          Go Home
        </Link>
      </div>
    );
  }

  const handleAddToPlaylist = () => {
    setIsAddToPlaylistModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900/50 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-6 text-gray-400 hover:text-white">
          <FaChevronDown size={24} />
        </button>

        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="w-64 h-64 md:w-80 md:h-80 rounded-lg shadow-lg object-cover"
          />
          <div className="text-center md:text-left mt-6 md:mt-0">
            <h1 className="text-4xl font-bold">{currentSong.title}</h1>
            <p className="text-xl text-gray-300 mt-2">{currentSong.artist.name}</p>
          </div>
        </div>

        <div className="mt-12 flex justify-center items-center space-x-8">
          <button
            onClick={toggleRepeat}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isRepeating ? "text-purple-400 bg-purple-900/50" : "text-gray-400 hover:text-white"
            }`}
          >
            <FaRedo size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="w-20 h-20 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center"
          >
            {isPlaying ? <FaPause size={32} /> : <FaPlay size={32} className="ml-1" />}
          </button>
          <button
            onClick={handleAddToPlaylist}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-colors text-gray-400 hover:text-white"
          >
            <FaPlus size={20} />
          </button>
        </div>
      </div>
      {currentSong && (
        <AddToPlaylistModal
          song={currentSong}
          isOpen={isAddToPlaylistModalOpen}
          onClose={() => setIsAddToPlaylistModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PlayerPage;

