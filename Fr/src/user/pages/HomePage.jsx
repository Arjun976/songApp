import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import SongList from "../components/SongList";
import GenreFilter from "../components/GenreFilter";
import Button from "../../components/ui/Button";
import { getAllSongs } from "../../api/admin";
import { toggleFavorite } from "../../api/users";
import AddToPlaylistModal from "../components/AddToPlaylistModal";
import { AuthContext } from "../../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [trending, setTrending] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await getAllSongs();
        setTrending(songs);
        setNewReleases(songs);

        const uniqueGenres = ["All", ...new Set(songs.map(song => song.genre))];
        setGenres(uniqueGenres);
      } catch (err) {
        setError("Failed to fetch songs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleAddToPlaylist = (song) => {
    setSelectedSong(song);
    setIsAddToPlaylistModalOpen(true);
  };
  
  const handleFavorite = async (id) => {
    try {
      const updatedUser = await toggleFavorite(id);
      console.log("Favorite toggled:", updatedUser);
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  };

  const filteredTrendingSongs = selectedGenre === "All"
    ? trending
    : trending.filter(song => song.genre === selectedGenre);

  const filteredSongs = selectedGenre === "All"
    ? newReleases
    : newReleases.filter(song => song.genre === selectedGenre);
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative h-96  flex items-center justify-center">
        <div className="text-center z-10 px-2">
          <h1 className="text-5xl md:text-6xl font-bold ">Discover Music</h1>
        </div>
        <div className="absolute inset-0 bg-black/60" />
      </section>

      {/* Genre Filter */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <GenreFilter genres={genres} selected={selectedGenre} onSelect={setSelectedGenre} />
      </div>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-purple-400">Trending Now</h2>
        <SongList
          songs={filteredTrendingSongs}
          loading={loading}
          error={error}
          onAddToPlaylist={handleAddToPlaylist}
          onFavorite={handleFavorite}
          favorites={user?.favorites || []}
        />
      </section>

      {/* New Releases */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-purple-400">New Releases</h2>
        <SongList
          songs={filteredSongs}
          loading={loading}
          error={error}
          onAddToPlaylist={handleAddToPlaylist}
          onFavorite={handleFavorite}
          favorites={user?.favorites || []}
        />
      </section>
      {selectedSong && (
        <AddToPlaylistModal
          song={selectedSong}
          isOpen={isAddToPlaylistModalOpen}
          onClose={() => setIsAddToPlaylistModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;