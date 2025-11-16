// components/user/RatingStars.jsx
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const RatingStars = ({ rating = 0, size = "md", onRate, readonly = false }) => {
  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState(rating);

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const handleClick = (value) => {
    if (readonly) return;
    setSelected(value);
    onRate?.(value);
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`cursor-pointer transition ${
            star <= (hover || selected)
              ? "text-yellow-400"
              : "text-gray-600"
          } ${sizes[size]} ${readonly ? "cursor-default" : ""}`}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={() => handleClick(star)}
        />
      ))}
      {!readonly && selected > 0 && (
        <span className="ml-2 text-sm text-gray-400">({selected}/5)</span>
      )}
    </div>
  );
};

export default RatingStars;