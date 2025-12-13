// src/api/users.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUserStats = async () => {
  const res = await axios.get(`${API_URL}/stats`, getAuthHeaders());
  return res.data;
};

export const toggleFavorite = async (songId) => {
  const res = await axios.post(`${API_URL}/favorites`, { songId }, getAuthHeaders());
  return res.data;
};

export const getFavoriteSongs = async () => {
  const res = await axios.get(`${API_URL}/favorites`, getAuthHeaders());
  return res.data;
};
