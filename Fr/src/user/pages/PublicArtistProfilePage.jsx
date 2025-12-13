// user/pages/PublicArtistProfilePage.jsx
import React from "react";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const PublicArtistProfilePage = () => {
  // This is a placeholder. In a real app, you would fetch the artist's data
  // based on the ID from the URL.
  const artist = {
    name: "Luna Echo",
    genre: "Electronic • Synthwave",
    profilePicture: "/artist.jpg",
    stats: {
      songs: 24,
      followers: "89.2K",
    },
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Avatar + Stats */}
          <div className="md:col-span-1">
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 text-center">
              <Avatar src={artist.profilePicture} alt={artist.name} size="lg" />
              <h2 className="text-2xl font-bold mt-4">{artist.name}</h2>
              <p className="text-gray-400">{artist.genre}</p>
              <Button className="mt-6 w-full">Follow</Button>
            </div>

            <div className="mt-6 bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
              <h3 className="font-semibold mb-4">Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Songs</span>
                  <span className="text-purple-400">{artist.stats.songs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Followers</span>
                  <span className="text-purple-400">{artist.stats.followers}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio and top songs or other info */}
          <div className="md:col-span-2">
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-8">
              <h3 className="text-xl font-semibold mb-6">About {artist.name}</h3>
              <p className="text-gray-300">
                This is where the artist's bio would go. In a real application, you'd fetch this from your backend along with the artist's other details. For now, it's just a placeholder.
              </p>
            </div>
            {/* You could add a list of top songs here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicArtistProfilePage;
