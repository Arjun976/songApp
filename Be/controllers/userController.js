// controllers/userController.js
const User = require("../models/User");
const Playlist = require("../models/Playlist");

exports.getProfile = async (req, res) => {
  console.log('Get Profile Request User ID:', req.user.id);
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log('Get Profile User:', user);
    res.json(user);
    
  } catch (error) {
      console.error('Get Profile Error:', error.stack || error);
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
  } catch (error) { // <-- This is the corrected line
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  console.log('Update Profile Request Body:', req.body);
  try {
    const { name, bio } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.bio = bio || user.bio;

    if (req.file) {
      user.profilePicture = req.file.path;
    }
   console.log('Updating User Profile:', {
      name: user.name,
      bio: user.bio,
      profilePicture: user.profilePicture,
    });
    await user.save();

    // It's good practice to not send the password back, even if it's hashed.
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json(userResponse);
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ 
      message: "Server error during profile update.",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};