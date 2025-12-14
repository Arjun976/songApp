import React, { useEffect, useState } from "react";
import SongTable from "../components/SongTable";
import { getAllSongs, deleteSong } from "../../api/songs";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const fetchedSongs = await getAllSongs();
        setSongs(fetchedSongs);
      } catch (err) {
        setError("Failed to fetch songs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleDelete = async (songId) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      try {
        await deleteSong(songId);
        setSongs(songs.filter((song) => song._id !== songId));
      } catch (err) {
        setError("Failed to delete song");
        console.error(err);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Manage Songs</h1>
      <SongTable songs={songs} onDelete={handleDelete} />
    </div>
  );
};

export default SongsPage;
