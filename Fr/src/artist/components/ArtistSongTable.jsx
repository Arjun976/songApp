// artist/components/ArtistSongTable.jsx
import React from "react";
import SongRow from "./SongRow";

const ArtistSongTable = ({ songs = [] }) => {
  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black/40">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Song</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Plays</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Downloads</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Earnings</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Uploaded</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {songs.map((song) => (
              <SongRow key={song._id} song={song} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtistSongTable;