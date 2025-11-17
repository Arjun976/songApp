// admin/pages/SongsPage.jsx
import React from "react";
import SongTable from "../components/SongTable";

const SongsPage = () => {
  // You can fetch actual song data here and pass it to the table
  const sampleSongs = [
    { id: 1, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", duration: "5:55", plays: 1200000 },
    { id: 2, title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV", duration: "8:02", plays: 950000 },
    { id: 3, title: "Hotel California", artist: "Eagles", album: "Hotel California", duration: "6:30", plays: 1500000 },
    { id: 4, title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", duration: "5:01", plays: 800000 },
    { id: 5, title: "Imagine", artist: "John Lennon", album: "Imagine", duration: "3:01", plays: 1100000 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Manage Songs</h1>
      <SongTable songs={sampleSongs} />
    </div>
  );
};

export default SongsPage;
