// src/api/admin.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

// Get all users (admin only)
export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Upload a new song (artist only)
export const uploadSong = async (songData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post("http://localhost:5000/api/songs/upload", songData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Get songs by the currently logged-in artist
export const getMySongs = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:5000/api/songs/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get all songs (public)
export const getAllSongs = async () => {
  const response = await axios.get("http://localhost:5000/api/songs");
  return response.data;
};

// Search for songs
export const searchSongs = async (query) => {
  const response = await axios.get(`http://localhost:5000/api/songs/search?q=${query}`);
  return response.data;
};
