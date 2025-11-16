// components/ui/Progress.jsx
import React from "react";

const Progress = ({ value = 0, max = 100, height = "h-1" }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${height}`}>
      <div
        className="h-full bg-purple-500 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default Progress;