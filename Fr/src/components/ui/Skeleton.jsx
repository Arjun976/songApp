// components/ui/Skeleton.jsx
import React from "react";

const Skeleton = ({ className = "", height = "h-4", width = "w-full" }) => {
  return (
    <div
      className={`bg-gray-700/50 rounded animate-pulse ${width} ${height} ${className}`}
    />
  );
};

export default Skeleton;