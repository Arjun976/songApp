// components/common/VoiceCommandIndicator.jsx
import React from "react";
import { FaMicrophone } from "react-icons/fa";

const VoiceCommandIndicator = ({ isListening }) => {
  return (
    <div
      className={`fixed bottom-20 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all ${
        isListening
          ? "bg-purple-600 animate-pulse ring-4 ring-purple-500/50"
          : "bg-gray-800"
      }`}
    >
      <FaMicrophone className={`text-xl ${isListening ? "text-white" : "text-gray-400"}`} />
    </div>
  );
};

export default VoiceCommandIndicator;