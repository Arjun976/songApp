// src/context/MusicContext.jsx
import React, { createContext, useContext, useState } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false); // New state for repeat

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setIsPlayerVisible(true);
  };

  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleRepeat = () => {
    setIsRepeating((prev) => !prev);
  };

  const value = {
    currentSong,
    isPlaying,
    isPlayerVisible,
    isRepeating, // Add isRepeating to context value
    playSong,
    togglePlay,
    toggleRepeat, // Add toggleRepeat to context value
    setIsPlayerVisible,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};

export const useMusic = () => {
  return useContext(MusicContext);
};
