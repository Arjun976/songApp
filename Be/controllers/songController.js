// controllers/songController.js
const Song = require("../models/Song");
const User = require("../models/User");

exports.uploadSong = async (req, res) => {
  console.log("--- ENTERING UPLOADSONG CONTROLLER ---");
  try {
    const { title, genre, isPremium, price } = req.body;

    // Check if user is authenticated and ID is available
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated or ID missing." });
    }

    const artistId = req.user.id;

    // Get the uploaded files from multer (via Cloudinary)
    const audioFile = req.files?.["audio"]?.[0];
    const coverFile = req.files?.["cover"]?.[0];

    // Validation for files
    if (!audioFile || !audioFile.path) {
      return res.status(400).json({ message: "Audio file is required or upload failed" });
    }
    if (!coverFile || !coverFile.path) {
      return res.status(400).json({ message: "Cover image is required or upload failed" });
    }

    // Validate and prepare song data
    const isPremiumBool = isPremium === "true" || isPremium === true;
    let finalPrice = 0;

    if (isPremiumBool) {
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({ message: "A valid non-negative price is required for premium songs." });
      }
      finalPrice = Math.round(parsedPrice * 100); // Store in cents
    }

    // Create the song with real Cloudinary URLs
    const song = await Song.create({
      title,
      genre,
      artist: artistId,
      audioUrl: audioFile.path,
      coverUrl: coverFile.path,
      isPremium: isPremiumBool,
      price: finalPrice,
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
    console.log("---!!! ENCOUNTERED ERROR IN UPLOADSONG CATCH BLOCK !!!---");
    console.log("--- ERROR MESSAGE:", String(error.message));
    console.log("--- ERROR STACK:", String(error.stack));
    console.log("--- FULL ERROR:", error);
    res.status(500).json({ message: "Upload failed", error: error.message || "An unknown error occurred.", stack: error.stack });
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