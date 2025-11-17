// admin/components/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaMusic, FaDollarSign, FaCog } from "react-icons/fa";

const AdminSidebar = () => {
  const navItems = [
    { to: "/admin", icon: FaHome, label: "Dashboard" },
    { to: "/admin/users", icon: FaUsers, label: "Users" },
    { to: "/admin/songs", icon: FaMusic, label: "Songs" },
    { to: "/admin/revenue", icon: FaDollarSign, label: "Revenue" },
    { to: "/admin/settings", icon: FaCog, label: "Settings" },
  ];

  return (
    <div className="w-64 bg-black/80 backdrop-blur-xl border-r border-gray-700 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-purple-400 mb-8">Admin Panel</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            <item.icon />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;