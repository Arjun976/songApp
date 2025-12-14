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

export const updateUserProfile = async (formData) => {
  console.log('Updating user profile with data:', formData);
  try {
    const { headers } = getAuthHeaders();
    const res = await axios.put(`${API_URL}/profile`, formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
