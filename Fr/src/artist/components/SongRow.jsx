// artist/components/SongRow.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import Badge from "../../components/ui/Badge";

const SongRow = ({ song }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/dashboard/songs/${song._id}/comments`);
  };

  return (
    <tr
      className="hover:bg-gray-800/50 transition cursor-pointer"
      onClick={handleRowClick}
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
            <FaPlay className="text-purple-400 text-sm" />
          </div>
          <div>
            <p className="font-medium text-white">{song.title}</p>
            <p className="text-sm text-gray-400">{song.genre}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-purple-400">{song.plays?.toLocaleString()}</td>
      <td className="px-6 py-4 text-green-400">{song.downloads || 0}</td>
      <td className="px-6 py-4 text-yellow-400">${song.earnings || 0}</td>
      <td className="px-6 py-4 text-sm text-gray-400">
        {new Date(song.uploadedAt).toLocaleDateString()}
      </td>
    </tr>
  );
};

export default SongRow;