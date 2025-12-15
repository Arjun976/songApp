// src/api/songs.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/songs";

// Get all songs
export const getAllSongs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Search songs and artists
export const search = async (query) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { q: query },
  });
  return response.data; // Should return { songs: [], artists: [] }
};

export const deleteSong = async (songId) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/${songId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get a single song by ID
export const getSongById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Rate a song
export const rateSong = async (id, rating) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found. Please log in.");
  const response = await axios.post(
    `${API_URL}/${id}/rate`,
    { rating },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Add a comment to a song
export const addComment = async (id, text) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found. Please log in.");
  const response = await axios.post(
    `${API_URL}/${id}/comments`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

