import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistById } from "../../api/playlists";
import { getFavoriteSongs } from "../../api/users";
import SongList from "../components/SongList";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        setLoading(true);
        let fetchedData;
        if (id === "favorites") {
          const favoriteSongs = await getFavoriteSongs();
          fetchedData = {
            name: "Favorites",
            songs: favoriteSongs,
          };
        } else {
          fetchedData = await getPlaylistById(id);
        }
        setPlaylist(fetchedData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch playlist details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylistData();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!playlist) {
    return <p>Playlist not found.</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{playlist.name}</h1>
        </div>
        <SongList songs={playlist.songs} />
      </div>
    </div>
  );
};

export default PlaylistDetailPage;
