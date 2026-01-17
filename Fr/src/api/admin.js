// src/api/admin.js
import axios from "axios";
import { API_BASE_URL } from "./config";

const ADMIN_API_URL = `${API_BASE_URL}/admin`;

// Get all users (admin only)
export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${ADMIN_API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Upload a new song (artist only)
export const uploadSong = async (songData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_BASE_URL}/songs/upload`, songData, {
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
  const response = await axios.get(`${API_BASE_URL}/songs/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get all songs (public)
export const getAllSongs = async () => {
  const response = await axios.get(`${API_BASE_URL}/songs`);
  return response.data;
};

// Search for songs
export const searchSongs = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/songs/search?q=${query}`);
  return response.data;
};

export const banUser = async (userId) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${ADMIN_API_URL}/users/${userId}/ban`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteUser = async (userId) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${ADMIN_API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
