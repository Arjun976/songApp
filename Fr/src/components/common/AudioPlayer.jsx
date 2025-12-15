// components/common/AudioPlayer.jsx
import React, { useRef, useEffect, useState } from "react";
import { useMusic } from "../../context/MusicContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaRandom,
  FaRedo,
  FaChevronUp,
} from "react-icons/fa";

const AudioPlayer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    isPlayerVisible,
    isRepeating,
    toggleRepeat,
  } = useMusic();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const navigate = useNavigate();

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.log(e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      // If a new song is loaded, and it's set to play, reset progress
      if (currentSong) {
        audioRef.current.currentTime = 0;
        setTimeout(() => {
          setProgress(0);
        }, 0);
      }
    }
  }, [volume, currentSong]); // Add currentSong to dependencies for volume effect

  const handleTimeUpdate = () => {
    const progress =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progress);
  };

  const handleSeek = (e) => {
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (clickX / width) * duration;
  };

  const handleSongEnded = () => {
    if (isRepeating) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // Reset to beginning
        audioRef.current.play(); // Play again
      }
    } else {
      if (isPlaying) {
        togglePlay();
      } // Stop playback if not repeating
    }
  };

  if (!isPlayerVisible || !currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-800 p-4 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-white">
        {/* Song Info */}
        <div
          className="flex items-center space-x-4 flex-1 cursor-pointer"
          onClick={() => navigate("/player")}
        >
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="w-12 h-12 bg-gray-800 rounded-lg flex-shrink-0"
          />
          <div>
            <p className="font-medium">{currentSong.title}</p>
            <p className="text-sm text-gray-400">{currentSong.artist.name}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-purple-400">
            <FaRandom />
          </button>
          <button className="text-gray-400 hover:text-purple-400">
            <FaStepBackward />
          </button>
          <button
            onClick={togglePlay}
            className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center"
          >
            {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
          </button>
          <button className="text-gray-400 hover:text-purple-400">
            <FaStepForward />
          </button>
          <button
            onClick={toggleRepeat}
            className={`text-gray-400 hover:text-purple-400 ${
              isRepeating ? "text-purple-400" : ""
            }`}
          >
            <FaRedo />
          </button>
        </div>

        {/* Progress */}
        <div
          className="flex-1 hidden md:flex items-center mx-6 cursor-pointer"
          onClick={handleSeek}
        >
          <div className="h-1 bg-gray-700 rounded-full w-full">
            <div
              className="h-full bg-purple-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-2 w-24 hidden lg:flex">
          <FaVolumeUp className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
          />
        </div>
        <button
          onClick={() => navigate("/player")}
          className="text-gray-400 hover:text-white ml-4"
        >
          <FaChevronUp />
        </button>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongEnded}
      />
    </div>
  );
};

export default AudioPlayer;