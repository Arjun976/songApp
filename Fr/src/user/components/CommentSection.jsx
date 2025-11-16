// components/user/CommentSection.jsx
import React, { useState } from "react";
import { FaPaperPlane, FaUser } from "react-icons/fa";
import Avatar from "../../components/ui/Avatar";

const CommentSection = ({ comments = [], onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit?.(text);
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
          <div key={c._id} className="flex gap-3">
            <Avatar size="sm" src={c.user?.avatar} alt={c.user?.name} />
            <div className="flex-1">
              <p className="font-semibold text-purple-400">{c.user?.name}</p>
              <p className="text-gray-300 text-sm">{c.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;