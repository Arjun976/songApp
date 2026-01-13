import React, { createContext, useContext, useState } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const playSong = (song) => {
    console.log("Playing song:", song);
    setCurrentSong(song);
    setIsPlaying(true);
    setIsPlayerVisible(true);
  };

  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying((prev) => !prev);
    }
  };

  const toggleRepeat = () => {
    setIsRepeating((prev) => !prev);
  };

  // ✅ ADD THIS FUNCTION
  const closePlayer = () => {
    setIsPlaying(false);       // stop music
    setCurrentSong(null);      // clear song
    setIsPlayerVisible(false); // hide player
  };

  const value = {
    currentSong,
    isPlaying,
    isPlayerVisible,
    isRepeating,
    playSong,
    togglePlay,
    toggleRepeat,
    closePlayer,          // 👈 expose it
    setIsPlayerVisible,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  return useContext(MusicContext);
};
