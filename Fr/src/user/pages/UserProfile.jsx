// src/user/pages/UserProfile.jsx
import React from "react";
import { FaEdit, FaDownload, FaMusic, FaHeart } from "react-icons/fa";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const UserProfile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/api/placeholder/100/100",
    playlists: 12,
    downloads: 45,
    favorites: 89,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Card>
          <div className="flex items-center gap-6">
            <Avatar src={user.avatar} alt={user.name} size="lg" />
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-400">{user.email}</p>
              <Button variant="ghost" size="sm" className="mt-2">
                <FaEdit className="mr-1" /> Edit Profile
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8 text-center">
            <div className="bg-black/40 p-4 rounded-lg">
              <FaMusic className="text-2xl text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{user.playlists}</p>
              <p className="text-sm text-gray-400">Playlists</p>
            </div>
            <div className="bg-black/40 p-4 rounded-lg">
              <FaDownload className="text-2xl text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{user.downloads}</p>
              <p className="text-sm text-gray-400">Downloads</p>
            </div>
            <div className="bg-black/40 p-4 rounded-lg">
              <FaHeart className="text-2xl text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{user.favorites}</p>
              <p className="text-sm text-gray-400">Favorites</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;