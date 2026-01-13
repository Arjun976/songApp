// Fr/src/artist/pages/SongCommentsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSong, getSongComments, addComment } from "../../api/songs";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import CommentSection from "../../user/components/CommentSection";

const SongCommentsPage = () => {
  const { songId } = useParams();
  const [song, setSong] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    const commentsData = await getSongComments(songId);
    setComments(commentsData);
  }

  useEffect(() => {
    const fetchSongAndComments = async () => {
      try {
        setLoading(true);
        const songData = await getSong(songId);
        setSong(songData);
        await fetchComments();
      } catch (err) {
        setError("Failed to fetch song details or comments.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongAndComments();
  }, [songId]);

  const handleCommentSubmit = async (commentText) => {
    try {
      const newComment = await addComment(songId, { text: commentText });
      setComments([newComment, ...comments]);
    } catch (error) {
      console.error("Failed to post comment:", error);
      // Optionally, show an error to the user
    }
  };

  const handleReplySubmit = async (commentId, replyText) => {
    try {
      await addComment(songId, { text: replyText, parentId: commentId });
      // Refetch comments to show the new reply
      await fetchComments();
    } catch (error) {
      console.error("Failed to post reply:", error);
    }
  };


  if (loading) return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!song) return <div className="text-center mt-8">Song not found.</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-400 mb-2">{song.title}</h1>
          <p className="text-lg text-gray-400">by {song.artist.name}</p>
        </div>
        
        <CommentSection 
          comments={comments}
          onCommentSubmit={handleCommentSubmit}
          onReplySubmit={handleReplySubmit}
        />
      </div>
    </div>
  );
};

export default SongCommentsPage;
