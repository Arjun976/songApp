import React from "react";
import { FaMicrophone } from "react-icons/fa";
import { useEffect, useState } from "react";

const VoiceCommandIndicator = ({ onCommand}) => {
  const [isListening, setIsListening] = useState(false);
  
  useEffect(() => {
      if (!("webkitSpeechRecognition" in window)) return;
  
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
  
      recognition.onresult = (e) => {
        const command = e.results[0][0].transcript.toLowerCase();
        onCommand(command);
        setIsListening(false);
      };
  
      if (isListening) recognition.start();
      else recognition.stop();
  
      return () => recognition.stop();
    }, [isListening, onCommand]);

  return (
    <button
      type="button" // important: prevents form submit
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
        isListening
          ? "bg-purple-600 animate-pulse text-white"
          : "bg-gray-700/70 text-gray-300 hover:bg-gray-600"
      }`}
      onClick={() => setIsListening(!isListening)}
      aria-label="Voice search"
    >
      <FaMicrophone className="text-lg" />
    </button>
  );
};

export default VoiceCommandIndicator;