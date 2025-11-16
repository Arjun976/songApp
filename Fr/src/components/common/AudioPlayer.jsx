// components/common/AudioPlayer.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolume2, FaRandom, FaRedo } from "react-icons/fa";

const AudioPlayer = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-800 p-4 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-white">
        {/* Song Info */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-12 h-12 bg-gray-800 rounded-lg flex-shrink-0"></div>
          <div>
            <p className="font-medium">{song?.title || "No song playing"}</p>
            <p className="text-sm text-gray-400">{song?.artist || "Unknown"}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-purple-400"><FaRandom /></button>
          <button className="text-gray-400 hover:text-purple-400"><FaStepBackward /></button>
          <button
            onClick={togglePlay}
            className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center"
          >
            {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
          </button>
          <button className="text-gray-400 hover:text-purple-400"><FaStepForward /></button>
          <button className="text-gray-400 hover:text-purple-400"><FaRedo /></button>
        </div>

        {/* Progress */}
        <div className="flex-1 hidden md:block mx-6">
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-2 w-24 hidden lg:flex">
          <FaVolume2 className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer slider-thumb"
          />
        </div>
      </div>

      <audio ref={audioRef} src={song?.audioUrl} />
    </div>
  );
};

export default AudioPlayer;