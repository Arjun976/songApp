// components/user/CommentSection.jsx
import React, { useState } from "react";
import { FaPaperPlane, FaUser, FaReply } from "react-icons/fa";
import Avatar from "../../components/ui/Avatar";

const Comment = ({ comment, onReplySubmit }) => {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReplySubmit?.(comment._id, replyText);
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="flex gap-3">
      <Avatar size="sm" src={comment.user?.avatar} alt={comment.user?.name} />
      <div className="flex-1">
        <p className="font-semibold text-purple-400">{comment.user?.name}</p>
        <p className="text-gray-300 text-sm">{comment.text}</p>
        <div className="flex items-center gap-4 mt-1">
          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
          <button
            onClick={() => setShowReply(!showReply)}
            className="text-xs text-gray-400 hover:text-purple-400 flex items-center gap-1"
          >
            <FaReply />
            Reply
          </button>
        </div>

        {showReply && (
          <form onSubmit={handleReplySubmit} className="flex gap-2 mt-2">
            <Avatar size="xs" alt="You" />
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Replying to ${comment.user?.name}...`}
              className="flex-1 bg-black/30 text-gray-200 rounded-lg px-3 py-1 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
              autoFocus
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 p-2 rounded-lg transition"
            >
              <FaPaperPlane size={12} />
            </button>
          </form>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3 pl-6 border-l border-gray-700">
            {comment.replies.map((reply) => (
              <Comment key={reply._id} comment={reply} onReplySubmit={onReplySubmit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


const CommentSection = ({ comments = [], onCommentSubmit, onReplySubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onCommentSubmit?.(text);
    setText("");
  };

  return (
    <div className="space-y-6">
      {/* Add Comment */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Avatar size="sm" alt="You" />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-black/40 text-gray-200 rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg transition"
        >
          <FaPaperPlane />
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((c) => (
          <Comment key={c._id} comment={c} onReplySubmit={onReplySubmit} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;