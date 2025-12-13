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
