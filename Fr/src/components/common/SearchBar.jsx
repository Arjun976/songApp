// components/common/SearchBar.jsx
import React, { useState } from "react";
import { FaSearch, FaMicrophone } from "react-icons/fa";

const SearchBar = ({ onSearch, placeholder = "Search songs, artists, genres..." }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-black/40 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
      />
      <FaSearch className="absolute left-4 text-gray-400" />
      <button
        type="button"
        className="absolute right-3 text-gray-400 hover:text-purple-400"
        onClick={() => alert("Voice search activated!")}
      >
        <FaMicrophone />
      </button>
    </form>
  );
};

export default SearchBar;