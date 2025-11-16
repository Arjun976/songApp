// src/user/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SongList from "../components/SongList";        // CORRECT
import GenreFilter from "../components/GenreFilter";  // CORRECT
import Button from "../../components/ui/Button";       // UI components (global)

const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTrending([
        { _id: 1, title: "Midnight Dreams", artist: { name: "Luna Echo" }, plays: 128450, isPremium: true },
        { _id: 2, title: "Neon Lights", artist: { name: "Synthwave" }, plays: 98700 },
      ]);
      setNewReleases([
        { _id: 3, title: "Echoes", artist: { name: "Nova" }, plays: 45000 },
      ]);
      setGenres(["All", "Pop", "Rock", "Hip Hop", "Jazz", "Electronic"]);
      setLoading(false);
    }, 1000);
  }, []);

  const handlePlay = (song) => console.log("Play:", song.title);
  const handleAddToPlaylist = (song) => console.log("Add:", song.title);
  const handleFavorite = (id) => console.log("Favorite:", id);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative h-96 bg-gradient-to-b from-purple-900/40 to-black flex items-center justify-center">
        <div className="text-center z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Music</h1>
          <p className="text-xl text-gray-300 mb-6">Stream free. Download premium.</p>
          <Link to="/search">
            <Button size="lg">Explore Now</Button>
          </Link>
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
          songs={trending}
          loading={loading}
          onPlay={handlePlay}
          onAddToPlaylist={handleAddToPlaylist}
          onFavorite={handleFavorite}
        />
      </section>

      {/* New Releases */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-purple-400">New Releases</h2>
        <SongList
          songs={newReleases}
          loading={loading}
          onPlay={handlePlay}
          onAddToPlaylist={handleAddToPlaylist}
          onFavorite={handleFavorite}
        />
      </section>
    </div>
  );
};

export default HomePage;