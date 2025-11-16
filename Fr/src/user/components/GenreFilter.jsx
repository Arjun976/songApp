// src/user/components/GenreFilter.jsx
import React from "react";
import Button from "../../components/ui/Button";

const GenreFilter = ({ genres = [], selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <Button
          key={genre}
          variant={selected === genre ? "primary" : "ghost"}
          size="sm"
          onClick={() => onSelect(genre)}
        >
          {genre}
        </Button>
      ))}
    </div>
  );
};

export default GenreFilter;