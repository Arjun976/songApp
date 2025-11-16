// components/common/Toast.jsx
import React, { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: <FaCheckCircle className="text-green-400" />,
    error: <FaExclamationCircle className="text-red-400" />,
    info: <FaExclamationCircle className="text-blue-400" />,
  };

  const bg = {
    success: "bg-gray-900/90 border-green-500/50",
    error: "bg-gray-900/90 border-red-500/50",
    info: "bg-gray-900/90 border-blue-500/50",
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-lg border backdrop-blur-xl text-white ${bg[type]} shadow-xl animate-slide-in`}>
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-3 text-gray-400 hover:text-white">
        <FaTimes />
      </button>
    </div>
  );
};

export default Toast;