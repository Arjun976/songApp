// pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaMusic } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-purple-600/20 rounded-full flex items-center justify-center animate-pulse">
            <FaMusic className="text-5xl text-purple-500" />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-purple-400 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition"
        >
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;