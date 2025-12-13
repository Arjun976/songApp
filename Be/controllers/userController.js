// controllers/userController.js
const User = require("../models/User");
const Playlist = require("../models/Playlist");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const playlistCount = await Playlist.countDocuments({ user: userId });

    const favoritesCount = user.favorites.length;
    const downloadsCount = 0;

    res.json({
      playlists: playlistCount,
      favorites: favoritesCount,
      downloads: downloadsCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const { songId } = req.body;
    const user = await User.findById(req.user.id);

    const index = user.favorites.indexOf(songId);
    if (index > -1) {
      // Song is already in favorites, remove it
      user.favorites.splice(index, 1);
    } else {
      // Add to favorites
      user.favorites.push(songId);
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFavoriteSongs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "favorites",
      populate: {
        path: "artist",
        model: "User",
      },
    });
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};