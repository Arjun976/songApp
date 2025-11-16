// components/ui/Avatar.jsx
import React from "react";

const Avatar = ({ src, alt, size = "md", online = false }) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-xl",
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`rounded-full object-cover ${sizes[size]}`}
        />
      ) : (
        <div
          className={`rounded-full bg-purple-600 flex items-center justify-center text-white font-bold ${sizes[size]}`}
        >
          {alt?.[0]?.toUpperCase() || "U"}
        </div>
      )}
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-gray-900 rounded-full" />
      )}
    </div>
  );
};

export default Avatar;