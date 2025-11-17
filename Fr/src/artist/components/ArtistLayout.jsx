// artist/components/ArtistLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import ArtistSidebar from "./ArtistSidebar";

const ArtistLayout = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar – fixed width */}
      <ArtistSidebar />

      {/* Main content area */}
      <div className="flex-1 ml-0 lg:ml-64">   {/* ml-64 = sidebar width */}
        <Outlet />   {/* ← THIS IS CRUCIAL */}
      </div>
    </div>
  );
};

export default ArtistLayout;