// components/ui/Card.jsx
import React from "react";

const Card = ({ children, className = "", hover = false }) => {
  return (
    <div
      className={`bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 transition ${
        hover ? "hover:border-purple-500/50 hover:shadow-purple-500/10" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;