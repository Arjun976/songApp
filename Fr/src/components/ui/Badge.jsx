// src/components/ui/Badge.jsx
import React from "react";

const Badge = ({ children, variant = "default", size = "sm", className = "" }) => {
  const variants = {
    default: "bg-gray-700 text-gray-300",
    purple: "bg-purple-600 text-white",
    green: "bg-green-600 text-white",
    red: "bg-red-600 text-white",
    premium: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;