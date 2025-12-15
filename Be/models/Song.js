// models/Song.js
const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  genre: { type: String, required: true },
  audioUrl: { type: String, required: true },      // Cloudinary
  coverUrl: { type: String, required: true },      // Cloudinary
  duration: String,                                // "3:45"
  isPremium: { type: Boolean, default: false },
  price: { type: Number, default: 0 },             // in cents (199 = $1.99)
  plays: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    value: { type: Number, min: 1, max: 5, required: true }
  }],
  averageRating: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

// Auto-upgrade user to "artist" when first song is saved
songSchema.post("save", async function(doc) {
  const User = mongoose.model("User");
  const artist = await User.findById(doc.artist);
  if (artist && artist.role === "user") {
    artist.role = "artist";
    await artist.save();
  }
});

module.exports = mongoose.model("Song", songSchema);