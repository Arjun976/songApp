// user/pages/SongDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { FaPlay, FaHeart, FaShare } from "react-icons/fa";
import RatingStars from "../components/RatingStars";
import CommentSection from "../components/CommentSection";
import DownloadButton from "../components/DownloadButton";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const SongDetailPage = () => {
  const { id } = useParams();
  const song = {
    _id: id,
    title: "Midnight Dreams",
    artist: { name: "Luna Echo" },
    coverUrl: "/api/placeholder/600/600",
    genre: "Electronic",
    duration: "3:45",
    plays: 128450,
    averageRating: 4.5,
    isPremium: true,
    price: 199,
    comments: [
      { _id: 1, user: { name: "Alex", avatar: "/api/placeholder/50/50" }, text: "This is fire!", createdAt: new Date() },
    ],
  };

  const handleRate = (rating) => {
    console.log("Rated:", rating);
  };

  const handleComment = (text) => {
    console.log("Comment:", text);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cover */}
          <div className="md:col-span-1">
            <img
              src={song.coverUrl}
              alt={song.title}
              className="w-full rounded-xl shadow-2xl border border-gray-700"
            />
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white">{song.title}</h1>
              <p className="text-xl text-purple-400 mt-1">{song.artist.name}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg">
                <FaPlay className="mr-2" /> Play
              </Button>
              <DownloadButton song={song} />
              <Button variant="ghost" size="lg">
                <FaHeart className="text-xl" />
              </Button>
              <Button variant="ghost" size="lg">
                <FaShare className="text-xl" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Genre</p>
                <p className="text-purple-400 font-medium">{song.genre}</p>
              </div>
              <div>
                <p className="text-gray-500">Duration</p>
                <p className="text-purple-400 font-medium">{song.duration}</p>
              </div>
              <div>
                <p className="text-gray-500">Plays</p>
                <p className="text-purple-400 font-medium">{song.plays.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Rating</p>
                <RatingStars rating={song.averageRating} onRate={handleRate} />
              </div>
            </div>

            {song.isPremium && (
              <Badge variant="premium">Premium Track</Badge>
            )}
          </div>
        </div>

        {/* Comments */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Comments</h2>
          <CommentSection comments={song.comments} onSubmit={handleComment} />
        </div>
      </div>
    </div>
  );
};

export default SongDetailPage;