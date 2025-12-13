// src/components/layout/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import AudioPlayer from "../common/AudioPlayer";

const MainLayout = ({ userRole = "user" }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar userRole={userRole} />
      <main className="pb-20">
        <Outlet /> {/* All pages inside this layout will appear here */}
      </main>
      <AudioPlayer />
    </div>
  );
};

export default MainLayout;