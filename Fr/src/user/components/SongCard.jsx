// src/user/components/SongCard.jsx
import React from "react";
import { FaPlay, FaHeart, FaPlus, FaDownload } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge";
import DownloadButton from "./DownloadButton";
import { useMusic } from "../../context/MusicContext";

const SongCard = ({ song, onAddToPlaylist, onFavorite, isFavorited }) => {
  const isPremium = song.isPremium;
  const { playSong } = useMusic();
  const navigate = useNavigate();

  const handlePlay = () => {
    playSong(song);
    navigate("/player");
  };

  return (
    <div className="group relative bg-gray-900/60 backdrop-blur-xl rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition">
      {/* Cover */}
      <div className="relative aspect-square">
        <img
          src={song.coverUrl || "/placeholder.jpg"}
          alt={song.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <button
            onClick={handlePlay}
            className="w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition"
          >
            <FaPlay className="ml-1" />
          </button>
        </div>
        {isPremium && (
          <Badge variant="premium" className="absolute top-2 right-2">
            Premium
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <Link to={`/song/${song._id}`} className="block">
          <h3 className="font-semibold text-white hover:text-purple-400 truncate">
            {song.title}
          </h3>
          <p className="text-sm text-gray-400">
            {song.artist?.name || "Unknown"}
          </p>
        </Link>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FaPlay className="text-purple-400" />{" "}
            {song.plays?.toLocaleString() || 0}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onFavorite(song._id)}
              className={`hover:text-red-400 ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
            >
              <FaHeart />
            </button>
            <button
              onClick={() => onAddToPlaylist(song)}
              className="text-gray-400 hover:text-purple-400"
            >
              <FaPlus />
            </button>
            {isPremium ? (
              <DownloadButton song={song} size="icon" />
            ) : (
              <a
                href={song.audioUrl}
                download
                className="text-green-400 hover:text-green-300"
              >
                <FaDownload />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;