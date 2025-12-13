import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SongList from "../components/SongList";
import ArtistList from "../components/ArtistList";
import { search } from "../../api/songs"; 
import LoadingSpinner from "../../components/common/LoadingSpinner";

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setSongs([]);
      setArtists([]);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const { songs, artists } = await search(query);
        setSongs(songs || []);
        setArtists(artists || []);
      } catch (err) {
        setError("Failed to fetch search results. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const totalResults = songs.length + artists.length;

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <div className="text-center text-red-400 py-8">{error}</div>;
    }
    
    if (totalResults === 0 && !loading) {
      return (
        <div className="text-center text-gray-400 py-8">
          <p className="text-xl">No results found.</p>
          <p>Try a different search term.</p>
        </div>
      );
    }

    return (
      <>
        <ArtistList artists={artists} />
        <SongList songs={songs} title="Songs" />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
          {query ? (
            <>
              Results for "<span className="text-purple-400">{query}</span>"
            </>
          ) : (
            "Search"
          )}
        </h1>
        
        {!loading && !error && query && (
          <p className="text-gray-400 mb-8">{totalResults} results found</p>
        )}

        <div className="mt-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
