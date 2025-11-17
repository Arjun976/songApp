// artist/pages/ArtistProfilePage.jsx
import React from "react";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const ArtistProfilePage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-purple-400">Artist Profile</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Avatar + Stats */}
          <div className="md:col-span-1">
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 text-center">
              <Avatar src="/artist.jpg" alt="Luna Echo" size="lg" />
              <h2 className="text-2xl font-bold mt-4">Luna Echo</h2>
              <p className="text-gray-400">Electronic • Synthwave</p>
              <Button className="mt-6 w-full">Edit Profile</Button>
            </div>

            <div className="mt-6 bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
              <h3 className="font-semibold mb-4">Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Songs</span>
                  <span className="text-purple-400">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Followers</span>
                  <span className="text-purple-400">89.2K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Edit Form */}
          <div className="md:col-span-2">
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-8">
              <h3 className="text-xl font-semibold mb-6">Edit Details</h3>
              <div className="space-y-6">
                <Input label="Artist Name" defaultValue="Luna Echo" />
                <Input label="Bio" placeholder="Tell your story..." />
                <Input label="Instagram" placeholder="@luna_echo" />
                <Input label="Spotify" placeholder="spotify.com/artist/..." />
                <Button className="w-full">Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfilePage;