// controllers/songController.js
const Song = require("../models/Song");
const User = require("../models/User");

exports.uploadSong = async (req, res) => {
  try {
    const { title, genre, isPremium, price } = req.body;

    // Get the uploaded files from multer (via Cloudinary)
    const audioFile = req.files?.["audio"]?.[0];   // audio file
    const coverFile = req.files?.["cover"]?.[0];   // cover image

    // Validation
    if (!audioFile) {
      return res.status(400).json({ message: "Audio file is required" });
    }
    if (!coverFile) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    // Create the song with real Cloudinary URLs
    const song = await Song.create({
      title,
      genre,
      artist: req.user.id,
      audioUrl: audioFile.path,          // Cloudinary URL for audio
      coverUrl: coverFile.path,          // Cloudinary URL for cover
      isPremium: isPremium === "true" || isPremium === true,
      price: isPremium === "true" ? Number(price) * 100 : 0, // in cents
    });

    // Send response
    res.status(201).json({
      message: "Song uploaded successfully!",
      song: {
        id: song._id,
        title: song.title,
        audioUrl: song.audioUrl,
        coverUrl: song.coverUrl,
        genre: song.genre,
        isPremium: song.isPremium,
        price: song.price,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find()
      .populate("artist", "name")
      .sort({ createdAt: -1 });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs" });
  }
};

exports.getMySongs = async (req, res) => {
  try {
    const songs = await Song.find({ artist: req.user.id })
      .populate("artist", "name")
      .sort({ createdAt: -1 });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

exports.search = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // 1. Find artists that match the query
    const artists = await User.find({
      name: { $regex: q, $options: "i" },
      role: "artist",
    }).select("-password"); // Exclude password
    const artistIds = artists.map((artist) => artist._id);

    // 2. Find songs that match the query in title, genre, OR by artist
    const songs = await Song.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { genre: { $regex: q, $options: "i" } },
        { artist: { $in: artistIds } },
      ],
    })
      .populate("artist", "name")
      .sort({ createdAt: -1 });

    res.json({ songs, artists });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Optional: Delete from Cloudinary as well
    // const publicId = song.audioUrl.split("/").pop().split(".")[0];
    // await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
    // ... same for cover

    await song.deleteOne();

    res.json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};