// src/api/auth.js
import axios from "axios";
import { API_BASE_URL } from "./config";

const AUTH_API_URL = `${API_BASE_URL}/auth`;

// Register user
export const register = async (userData) => {
  const response = await axios.post(`${AUTH_API_URL}/register`, userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

// Login user
export const login = async (userData) => {
  const response = await axios.post(`${AUTH_API_URL}/login`, userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get current user from localStorage
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};