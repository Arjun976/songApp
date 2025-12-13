import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlaylistCard from "../components/PlaylistCard";
import Button from "../../components/ui/Button";
import Modal from "../../components/common/Modal";
import { getMyPlaylists, createPlaylist } from "../../api/playlists";
import { getFavoriteSongs } from "../../api/users";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const fetchPlaylistsAndFavorites = async () => {
    try {
      setLoading(true);
      const [userPlaylists, favoriteSongs] = await Promise.all([
        getMyPlaylists(),
        getFavoriteSongs(),
      ]);

      const favoritesPlaylist = {
        _id: "favorites",
        name: "Favorites",
        songs: favoriteSongs,
      };

      setPlaylists([favoritesPlaylist, ...userPlaylists]);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylistsAndFavorites();
  }, []);

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    try {
      await createPlaylist({ name: newPlaylistName });
      setNewPlaylistName("");
      setIsModalOpen(false);
      fetchPlaylistsAndFavorites(); // Refetch all data
    } catch (err) {
      setError("Failed to create playlist.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Playlists</h1>
          <Button onClick={() => setIsModalOpen(true)}>Create Playlist</Button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist._id} playlist={playlist} />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Playlist"
        >
          <form onSubmit={handleCreatePlaylist}>
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist Name"
              className="w-full bg-gray-800 text-white rounded-md p-2 mb-4"
              required
            />
            <div className="flex justify-end">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default PlaylistsPage;