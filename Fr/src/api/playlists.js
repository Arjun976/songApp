// src/api/playlists.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/playlists";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMyPlaylists = async () => {
  const res = await axios.get(`${API_URL}/my`, getAuthHeaders());
  return res.data;
};

export const createPlaylist = async (playlistData) => {
  const res = await axios.post(API_URL, playlistData, getAuthHeaders());
  return res.data;
};

export const addSongToPlaylist = async (playlistId, songId) => {
  const res = await axios.post(`${API_URL}/${playlistId}/songs`, { songId }, getAuthHeaders());
  return res.data;
};

export const getPlaylistById = async (playlistId) => {
  const res = await axios.get(`${API_URL}/${playlistId}`, getAuthHeaders());
  return res.data;
};
