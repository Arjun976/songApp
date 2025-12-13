// models/Playlist.js
const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  isPublic: {
    type: Boolean,        // ← THIS MUST BE Boolean, not false
    default: false,       // ← default value goes here
  },
  coverUrl: String,
}, { timestamps: true });

module.exports = mongoose.model("Playlist", playlistSchema);