import React from "react";
import { Link } from "react-router-dom";
import { FaMusic, FaTrash } from "react-icons/fa";
import { deletePlaylist } from "../../api/playlists";

const PlaylistCard = ({ playlist, onDelete }) => {
  const handleDelete = async (e) => {
    e.stopPropagation();

    if (!window.confirm(`Delete "${playlist.name}" playlist?`)) return;

    try {
      await deletePlaylist(playlist._id);
      onDelete();
    } catch (err) {
      console.error(err);
      alert("Failed to delete playlist");
    }
  };

  return (
    <div className="relative group bg-gray-900/60 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/50 transition">
      
      {/* DELETE BUTTON */}
      {playlist._id !== "favorites" && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 z-10 text-red-500 opacity-0 group-hover:opacity-100 transition hover:scale-110"
        >
          <FaTrash />
        </button>
      )}

      {/* CLICKABLE CARD CONTENT */}
      <Link to={`/playlist/${playlist._id}`} className="block">
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
    </div>
  );
};

export default PlaylistCard;
