// components/user/VoiceCommandHandler.jsx
import React, { useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa";

const VoiceCommandHandler = ({ onCommand }) => {
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
      onClick={() => setIsListening(!isListening)}
      className={`fixed bottom-20 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition ${
        isListening
          ? "bg-purple-600 animate-pulse ring-4 ring-purple-500/50"
          : "bg-gray-800"
      }`}
    >
      <FaMicrophone className={`text-xl ${isListening ? "text-white" : "text-gray-400"}`} />
    </button>
  );
};

export default VoiceCommandHandler;