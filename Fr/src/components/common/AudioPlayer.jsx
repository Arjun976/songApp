import React, { useRef, useEffect, useState } from "react";
import { useMusic } from "../../context/MusicContext";
import { useNavigate } from "react-router-dom";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaRandom,
  FaRedo,
  FaChevronUp,
  FaTimes, // ❌ close icon
} from "react-icons/fa";

const AudioPlayer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    isPlayerVisible,
    isRepeating,
    toggleRepeat,
    closePlayer, 
  } = useMusic();

  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const navigate = useNavigate();

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume / 100;

    if (currentSong) {
      audioRef.current.currentTime = 0;
      setProgress(0);
    }
  }, [volume, currentSong]);

  const handleTimeUpdate = () => {
    const percent =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percent || 0);
  };

  const handleSeek = (e) => {
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;

    audioRef.current.currentTime = (clickX / width) * duration;
  };

  const handleSongEnded = () => {
    if (isRepeating) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      togglePlay();
    }
  };

  // ✅ Player hidden or song removed → render nothing
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
            className="w-12 h-12 bg-gray-800 rounded-lg"
          />
          <div>
            <p className="font-medium">{currentSong.title}</p>
            <p className="text-sm text-gray-400">
              {currentSong.artist?.name}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <FaRandom className="text-gray-400" />
          <FaStepBackward className="text-gray-400" />

          <button
            onClick={togglePlay}
            className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center"
          >
            {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
          </button>

          <FaStepForward className="text-gray-400" />

          <button
            onClick={toggleRepeat}
            className={`${
              isRepeating ? "text-purple-400" : "text-gray-400"
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

        {/* Volume + Actions */}
        <div className="flex items-center space-x-3">
          <FaVolumeUp className="text-gray-400 hidden lg:block" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="hidden lg:block"
          />

          {/* ⬆ Expand */}
          <button
            onClick={() => navigate("/player")}
            className="text-gray-400 hover:text-white"
          >
            <FaChevronUp />
          </button>

          {/* ❌ Close Player */}
          <button
            onClick={closePlayer}
            className="text-gray-400 hover:text-red-500"
            title="Close player"
          >
            <FaTimes />
          </button>
        </div>
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
