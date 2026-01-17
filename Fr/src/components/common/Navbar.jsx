// src/components/common/Navbar.jsx
import React, { useState, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaSignOutAlt, FaMusic, FaHome, FaUpload, FaChartBar, FaCog } from "react-icons/fa";
import VoiceCommandIndicator from "./VoiceCommandIndicator";
import { search } from "../../api/songs";
import { useMusic } from "../../context/MusicContext";

const Navbar = ({ userRole = "user" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [voiceCommand, setVoiceCommand] = useState("");
  const { playSong } = useMusic();

  const handleplaySong = useCallback(
    async (songName) => {
      console.log(`Playing song: ${songName}`);
      // Implement actual song playing logic here

      const { songs } = await search(songName);
      console.log("Songs found:", songs);
       if (songs.length === 0) {
        alert("No songs found for the command.");
        return;
      }

      if (songs.length === 1) {
        console.log("Found song to play:", songs[0]);
        playSong(songs[0]);
        navigate("/player");
      }
     
    },
    [navigate, playSong]
  );

  const handleVoiceCommand = (command) => {
    console.log("Voice command received:", command);
    setVoiceCommand(command);
  };

  useEffect(() => {
    if (!voiceCommand) return;
    const cleaned = voiceCommand.trim().toLowerCase();
    if (!cleaned.startsWith("play")) {
      alert("Unrecognized command. Please say 'play [song name]'.");
      setVoiceCommand("");
      return; 

    }

     if (cleaned.startsWith("play")) {
      const songName = cleaned.replace("play", "").trim();
      if (songName) {
        handleplaySong(songName);
      } else {
        console.log("No song name provided in the command.");
      }
      setVoiceCommand("");
    }
  }, [voiceCommand, handleplaySong]);
 

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navLinks = {
    user: [
      { to: "/home", label: "Home", icon: <FaHome /> },
      { to: "/playlists", label: "Playlists" },
      { to: "/profile", label: "Profile", icon: <FaUser /> },
    ],
    artist: [
      { to: "/artist", label: "Dashboard", icon: <FaChartBar /> },
      { to: "/artist/upload", label: "Upload", icon: <FaUpload /> },
      { to: "/artist/songs", label: "My Songs", icon: <FaMusic /> },
      { to: "/artist/earnings", label: "Earnings" },
      { to: "/artist/profile", label: "Profile", icon: <FaCog /> },
    ],
    admin: [
      { to: "/admin", label: "Dashboard", icon: <FaChartBar /> },
      { to: "/admin/users", label: "Users" },
      { to: "/admin/songs", label: "Songs" },
      { to: "/admin/revenue", label: "Revenue" },
      { to: "/admin/settings", label: "Settings", icon: <FaCog /> },
    ],
  };

  const links = navLinks[userRole] || navLinks.user;

  return (
    <nav className="bg-black/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <FaMusic className="text-white text-lg" />
            </div>
            <span className="text-2xl font-bold text-white hidden sm:block">Symphony</span>
          </Link>

          {/* Search Bar - Desktop */}
         <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
  <div className="relative w-full flex items-center">
    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search songs, artists..."
      className="w-full bg-gray-900/70 border border-gray-700 rounded-full py-3 pl-12 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
    />
    {/* Mic button inside input */}
    <div className="absolute right-2">
      <VoiceCommandIndicator onCommand={handleVoiceCommand} />
    </div>
  </div>
</form>
    
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-2 text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to || location.pathname.startsWith(link.to + "/")
                    ? "text-purple-400 font-semibold"
                    : "text-gray-300 hover:text-purple-300"
                }`}
              >
                {link.icon && <span>{link.icon}</span>}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Logout Button - Desktop */}
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-400 transition flex items-center space-x-2"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="text-sm">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-300 hover:text-white"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu + Mobile Search */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 border-t border-gray-800">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-gray-900/70 border border-gray-700 rounded-full py-3 pl-12 pr-5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </form>

            {/* Mobile Links */}
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition ${
                  location.pathname === link.to || location.pathname.startsWith(link.to + "/")
                    ? "bg-purple-600/30 text-purple-400"
                    : "text-gray-300 hover:bg-gray-900 hover:text-white"
                }`}
              >
                {link.icon && <span>{link.icon}</span>}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Logout Button - Mobile */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-red-400 hover:bg-red-900/20 transition"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;