// src/user/components/ArtistCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const ArtistCard = ({ artist }) => {
  return (
    <Link
      to={`/artist/${artist._id}`} // Assuming a route like this exists
      className="bg-gray-900/50 hover:bg-gray-800/70 transition-all duration-300 rounded-lg p-4 flex flex-col items-center space-y-3"
    >
      {artist.profilePicture ? (
        <img
          src={artist.profilePicture}
          alt={artist.name}
          className="w-24 h-24 rounded-full object-cover"
        />
      ) : (
        <FaUserCircle className="w-24 h-24 text-gray-600" />
      )}
      <div className="text-center">
        <h3 className="font-bold text-lg text-white truncate">{artist.name}</h3>
        <p className="text-sm text-gray-400">Artist</p>
      </div>
    </Link>
  );
};

export default ArtistCard;
