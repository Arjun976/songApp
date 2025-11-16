// components/common/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaMicrophone, FaUser, FaSignOutAlt, FaMusic } from "react-icons/fa";

const Navbar = ({ userRole = "user" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = {
    user: [
      { to: "/", label: "Home", icon: <FaMusic /> },
      { to: "/search", label: "Search", icon: <FaSearch /> },
      { to: "/playlists", label: "Playlists", icon: null },
      { to: "/profile", label: "Profile", icon: <FaUser /> },
    ],
    artist: [
      { to: "/artist/dashboard", label: "Dashboard", icon: null },
      { to: "/artist/upload", label: "Upload", icon: null },
      { to: "/artist/songs", label: "My Songs", icon: null },
    ],
    admin: [
      { to: "/admin/dashboard", label: "Dashboard", icon: null },
      { to: "/admin/users", label: "Users", icon: null },
      { to: "/admin/songs", label: "Songs", icon: null },
    ],
  };

  const links = navLinks[userRole] || navLinks.user;

  return (
    <nav className="bg-black/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <FaMusic className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-white">TuneFlow</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-1 text-sm font-medium transition ${
                  location.pathname === link.to
                    ? "text-purple-400"
                    : "text-gray-300 hover:text-purple-300"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            <button className="text-gray-300 hover:text-purple-400">
              <FaSignOutAlt />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-purple-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 border-t border-gray-800">
          <div className="px-4 pt-2 pb-3 space-y-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.to
                    ? "text-purple-400 bg-gray-900"
                    : "text-gray-300 hover:text-purple-300 hover:bg-gray-900"
                }`}
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;