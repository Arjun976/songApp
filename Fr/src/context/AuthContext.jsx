// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_URL = "http://localhost:5000/api/auth";

const api = axios.create({
  baseURL: API_URL,
});

// Helper to save user + token
const saveUserData = (data) => {
  console.log('Saving user data:', data);
  if (data.token && data.user) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  }
  return null;
};

// Helper to load user from localStorage
const loadUser = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   //Logged-in user object
  const [loading, setLoading] = useState(true);

  // On mount: check if user is already logged in
  useEffect(() => {
    const currentUser = loadUser();
    if (currentUser) {
      setTimeout(() => {
        setUser(currentUser);
        setLoading(false);
      }, 0);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  }, []);

  const register = async (userData) => {
    try {
      const res = await api.post("/register", userData);
      const savedUser = saveUserData(res.data);
      setUser(savedUser);
      return { success: true, data: res.data };
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      return { success: false, error: message };
    }
  };

  const login = async (userData) => {
    try {
      const res = await api.post("/login", userData);
      const savedUser = saveUserData(res.data);
      setUser(savedUser);
      return { success: true, data: res.data };
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        updateUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};