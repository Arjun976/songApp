// src/user/pages/SearchResultsPage.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SongList from "../components/SongList";        // CORRECT PATH
import GenreFilter from "../components/GenreFilter";  // CORRECT PATH

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Mock data
  const results = [
    { _id: 1, title: "Midnight Dreams", artist: { name: "Luna Echo" }, plays: 128450, isPremium: true },
    { _id: 2, title: "Neon Lights", artist: { name: "Synthwave" }, plays: 98700 },
  ];

  const handlePlay = (song) => {
    console.log("Play:", song.title);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">
          Results for "<span className="text-purple-400">{query}</span>"
        </h1>
        <p className="text-gray-400 mb-6">{results.length} songs found</p>

        <GenreFilter
          genres={["All", "Pop", "Rock", "Hip Hop", "Electronic"]}
          selected={selectedGenre}
          onSelect={setSelectedGenre}
        />

        <div className="mt-8">
          <SongList songs={results} onPlay={handlePlay} />
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;