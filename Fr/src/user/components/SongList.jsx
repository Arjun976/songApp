// src/user/components/SongList.jsx
import React from "react";
import SongCard from "./SongCard";  // Same folder
import Skeleton from "../../components/ui/Skeleton";

const SongList = ({ songs = [], loading = false, onPlay, onAddToPlaylist, onFavorite }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton height="h-4" width="w-3/4" />
            <Skeleton height="h-3" width="w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!songs.length) return <p className="text-center text-gray-500 py-10">No songs found.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {songs.map((song) => (
        <SongCard
          key={song._id}
          song={song}
          onPlay={onPlay}
          onAddToPlaylist={onAddToPlaylist}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
};

export default SongList;