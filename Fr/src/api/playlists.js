// src/api/playlists.js
import axios from "axios";
import { API_BASE_URL } from "./config";

const PLAYLISTS_API_URL = `${API_BASE_URL}/playlists`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMyPlaylists = async () => {
  const res = await axios.get(`${PLAYLISTS_API_URL}/my`, getAuthHeaders());
  return res.data;
};

export const createPlaylist = async (playlistData) => {
  const res = await axios.post(PLAYLISTS_API_URL, playlistData, getAuthHeaders());
  return res.data;
};

export const addSongToPlaylist = async (playlistId, songId) => {
  const res = await axios.post(`${PLAYLISTS_API_URL}/${playlistId}/songs`, { songId }, getAuthHeaders());
  return res.data;
};

export const getPlaylistById = async (playlistId) => {
  const res = await axios.get(`${PLAYLISTS_API_URL}/${playlistId}`, getAuthHeaders());
  return res.data;
};

export const deletePlaylist = async (playlistId) => {
  const res = await axios.delete(
    `${PLAYLISTS_API_URL}/${playlistId}`,
    getAuthHeaders()
  );
  return res.data;
};


