// src/api/users.js
import axios from "axios";
import { API_BASE_URL } from "./config";

const USERS_API_URL = `${API_BASE_URL}/users`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUserStats = async () => {
  const res = await axios.get(`${USERS_API_URL}/stats`, getAuthHeaders());
  return res.data;
};

export const toggleFavorite = async (songId) => {
  const res = await axios.post(`${USERS_API_URL}/favorites`, { songId }, getAuthHeaders());
  return res.data;
};

export const getFavoriteSongs = async () => {
  const res = await axios.get(`${USERS_API_URL}/favorites`, getAuthHeaders());
  return res.data;
};

export const updateUserProfile = async (formData) => {
  console.log('Updating user profile with data:', formData);
  try {
    const { headers } = getAuthHeaders();
    const res = await axios.put(`${USERS_API_URL}/profile`, formData, {
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
