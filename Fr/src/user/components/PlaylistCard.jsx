// src/user/components/PlaylistCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaMusic } from "react-icons/fa";

const PlaylistCard = ({ playlist }) => {
  return (
    <Link
      to={`/playlist/${playlist._id}`}
      className="block group bg-gray-900/60 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/50 transition"
    >
      <div className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition">
        <FaMusic className="text-3xl text-white/80" />
      </div>
      <h3 className="font-semibold text-white group-hover:text-purple-400 truncate">
        {playlist.name}
      </h3>
      <p className="text-sm text-gray-400">
        {playlist.songs?.length || 0} songs
      </p>
    </Link>
  );
};

export default PlaylistCard;