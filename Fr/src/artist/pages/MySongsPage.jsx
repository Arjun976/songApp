// artist/pages/MySongsPage.jsx
import React, { useState, useEffect } from "react";
import ArtistSongTable from "../components/ArtistSongTable";
import Button from "../../components/ui/Button";
import { getMySongs } from "../../api/admin";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const MySongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const fetchedSongs = await getMySongs();
        setSongs(fetchedSongs);
        console.log("Fetched songs for MySongsPage:", fetchedSongs);
      } catch (err) {
        setError("Failed to fetch songs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-400">My Songs</h1>
          <Button>Export Earnings</Button>
        </div>
        <ArtistSongTable songs={songs} />
      </div>
    </div>
  );
};

export default MySongsPage;