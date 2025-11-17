// src/admin/components/SongTable.jsx
import React from "react";
import { FaTrash, FaPlay, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Badge from "../../components/ui/Badge";

const SongTable = ({ songs = [], onDelete }) => {
  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black/40">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Song</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Artist</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Genre</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Plays</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Uploaded</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {songs.map((song) => (
              <tr key={song._id} className="hover:bg-gray-800/50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <FaPlay className="text-purple-400 text-sm" />
                    </div>
                    <div>
                      <Link
                        to={`/song/${song._id}`}
                        className="font-medium text-white hover:text-purple-400"
                      >
                        {song.title}
                      </Link>
                      {song.isPremium && (
                        <Badge variant="premium" size="sm" className="ml-2">
                          Premium
                        </Badge>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-500 text-sm" />
                    <span className="text-sm text-gray-300">{song.artist?.name || "Unknown"}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {song.genre || "—"}
                </td>
                <td className="px-6 py-4 text-sm text-purple-400">
                  {song.plays?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(song.uploadedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onDelete(song._id, song.title)}
                    className="text-red-400 hover:text-red-300 transition"
                    title="Delete Song"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongTable;