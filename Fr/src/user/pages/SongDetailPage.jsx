// user/pages/SongDetailPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaPlay, FaHeart, FaShare } from "react-icons/fa";
import RatingStars from "../components/RatingStars";
import CommentSection from "../components/CommentSection";
import DownloadButton from "../components/DownloadButton";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { getSong, addComment, rateSong } from "../../api/songs";
import { useMusic } from "../../context/MusicContext";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const SongDetailPage = () => {
  const { id } = useParams();
  const { playSong } = useMusic();
  const { user } = useContext(AuthContext);

  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        setLoading(true);
        const fetchedSong = await getSong(id);
        setSong(fetchedSong);
      } catch (err) {
        setError("Failed to fetch song details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSong();
  }, [id]);

  const handleRate = async (rating) => {
    console.log("--- Rating to submit:", rating);
    if (!user) {
      alert("Please log in to rate this song.");
      return;
    }
    try {
      const updatedSong = await rateSong(song._id, rating);
      console.log("--- Updated song after rating:", updatedSong);
      setSong((prev) => ({ ...prev, averageRating: updatedSong.averageRating }));
      // Optionally show a success toast
    } catch (err) {
      console.error("Failed to rate song:", err);
      // Optionally show an error toast
    }
  };

  const handleComment = async (text) => {
    if (!user) {
      alert("Please log in to comment.");
      return;
    }
    if (!text.trim()) return;
    try {
      const newComment = await addComment(song._id, { text });
      setSong((prev) => ({
        ...prev,
        comments: [newComment, ...prev.comments],
      }));
    } catch (err) {
      console.error("Failed to add comment:", err);
      // Optionally show an error toast
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  if (!song) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        Song not found.
      </div>
    );
  }

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
              <p className="text-xl text-purple-400 mt-1">{song.artist?.name || "Unknown Artist"}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => playSong(song)}>
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
                <p className="text-purple-400 font-medium">{song.duration || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500">Plays</p>
                <p className="text-purple-400 font-medium">{(song.plays || 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Rating</p>
                <RatingStars rating={song.averageRating} onRate={handleRate} disabled={!user} />
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
          <CommentSection
            comments={song.comments || []}
            onCommentSubmit={handleComment}
            disabled={!user}
          />
        </div>
      </div>
    </div>
  );
};

export default SongDetailPage;