// src/user/components/AddToPlaylistModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "../../components/common/Modal";
import { getMyPlaylists, addSongToPlaylist } from "../../api/playlists";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const AddToPlaylistModal = ({ song, isOpen, onClose }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const fetchPlaylists = async () => {
        try {
          setLoading(true);
          const userPlaylists = await getMyPlaylists();
          setPlaylists(userPlaylists);
          setError(null);
        } catch (err) {
          setError("Failed to fetch playlists.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchPlaylists();
    }
  }, [isOpen]);

  const handlePlaylistClick = async (playlistId) => {
    try {
      await addSongToPlaylist(playlistId, song._id);
      onClose(); // Close modal on success
      // Optionally, show a success toast
    } catch (err) {
      setError("Failed to add song to playlist.");
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Add "${song.title}" to a playlist`}>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-2">
          {playlists.map((playlist) => (
            <li
              key={playlist._id}
              onClick={() => handlePlaylistClick(playlist._id)}
              className="p-2 rounded-md hover:bg-gray-800 cursor-pointer"
            >
              {playlist.name}
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default AddToPlaylistModal;
