// artist/components/ArtistSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUpload, FaMusic, FaDollarSign, FaCog } from "react-icons/fa";

const ArtistSidebar = () => {
  const links = [
    { to: "/dashboard", icon: FaHome, label: "Dashboard" },
    { to: "/dashboard/upload", icon: FaUpload, label: "Upload" },
    { to: "/dashboard/songs", icon: FaMusic, label: "My Songs" },
    { to: "/dashboard/earnings", icon: FaDollarSign, label: "Earnings" },
    { to: "/dashboard/profile", icon: FaCog, label: "Profile" },
  ];

  return (
    <aside className="w-64 bg-black/80 backdrop-blur-xl border-r border-gray-700 fixed inset-y-0 left-0 z-50 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-purple-400 mb-10">Artist Panel</h1>
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`
              }
            >
              <link.icon />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default ArtistSidebar;