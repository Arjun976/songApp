// src/api/songs.js
import axios from "axios";
import { API_BASE_URL } from "./config";

const SONGS_API_URL = `${API_BASE_URL}/songs`;

// Get all songs
export const getAllSongs = async () => {
  const response = await axios.get(SONGS_API_URL);
  return response.data;
};

// Search songs and artists
export const search = async (query) => {
  const response = await axios.get(`${SONGS_API_URL}/search`, {
    params: { q: query },
  });
  return response.data; // Should return { songs: [], artists: [] }
};

export const deleteSong = async (songId) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${SONGS_API_URL}/${songId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get a single song by ID
export const getSong = async (id) => {
  const response = await axios.get(`${SONGS_API_URL}/${id}`);
  return response.data;
};

// Get comments for a song
export const getSongComments = async (songId) => {
  const response = await axios.get(`${SONGS_API_URL}/${songId}/comments`);
  return response.data;
};
//delete comment
export const deleteComment = async (songId, commentId) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(
    `${SONGS_API_URL}/${songId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

// Rate a song
export const rateSong = async (id, rating) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found. Please log in.");
  const response = await axios.post(
    `${SONGS_API_URL}/${id}/rate`,
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
export const addComment = async (id, commentData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found. Please log in.");
  const response = await axios.post(
    `${SONGS_API_URL}/${id}/comments`,
    commentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

