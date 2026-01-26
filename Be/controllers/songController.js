// controllers/songController.js
const Song = require("../models/Song");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  try {
    const { text, parentId } = req.body; // parentId for replies
    const songId = req.params.id;
    const userId = req.user.id;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required." });
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }

    // Create the new comment
    const newComment = new Comment({
      text,
      user: userId,
      song: songId,
      parent: parentId || null,
    });
    await newComment.save();
    
    if (parentId) {
      // It's a reply, add it to the parent comment's replies array
      const parentComment = await Comment.findById(parentId);
      if (parentComment) {
        parentComment.replies.push(newComment._id);
        await parentComment.save();
      }
    } else {
      // It's a top-level comment, add it to the song's comments array
      song.comments.unshift(newComment._id);
      await song.save();
    }

    // Populate user details for the response
    const populatedComment = await Comment.findById(newComment._id).populate("user", "name profilePicture _id");

    res.status(201).json(populatedComment);

  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error while adding comment." });
  }
};

exports.getSongComments = async (req, res) => {
  try {
    const songId = req.params.id;
    const comments = await Comment.find({ song: songId, parent: null })
      .populate("user", "name profilePicture _id")
      .populate({
        path: "replies",
        populate: {
          path: "user",
          select: "name profilePicture _id",
        },
        options: { sort: { createdAt: "asc" } },
      })
      .sort({ createdAt: "desc" });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error while fetching comments." });
  }
};
exports.deleteComment = async (req, res) => {
  try {
    const songId = req.params.id;
    const commentId = req.params.commentId;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    const user = await User.findById(userId);

    if (comment.user.toString() !== userId && user.role !== 'admin') {
      return res.status(403).json({ message: "You are not authorized to delete this comment." });
    }

    // Remove the comment from the song's comments array
    const song = await Song.findById(songId);
    if (song) {
      song.comments = song.comments.filter(commentId => commentId.toString() !== comment._id.toString());
      await song.save();
    }

    // Delete the comment itself
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Server error while deleting comment." });
  }
};

exports.rateSong = async (req, res) => {
  try {
    const { rating } = req.body;
    const songId = req.params.id;
    const userId = req.user.id;

    console.log(`--- Rating attempt: user ${userId} rates song ${songId} with ${rating} stars ---`);

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "A rating between 1 and 5 is required." });
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }

    console.log("--- Song found. Ratings before update:", JSON.stringify(song.ratings));

    const existingRatingIndex = song.ratings.findIndex(r => r.user.toString() === userId);

    if (existingRatingIndex > -1) {
      console.log("--- User has an existing rating. Updating it.");
      song.ratings[existingRatingIndex].value = rating;
    } else {
      console.log("--- No existing rating found for user. Adding new one.");
      song.ratings.push({ user: userId, value: rating });
    }

    console.log("--- Ratings after update:", JSON.stringify(song.ratings));

    const totalRating = song.ratings.reduce((acc, r) => acc + r.value, 0);
    const newAverage = totalRating / song.ratings.length;
    song.averageRating = parseFloat(newAverage.toFixed(2));

    console.log(`--- Recalculated average rating: ${song.averageRating}. Attempting to save...`);

    const savedSong = await song.save();

    console.log("--- Song saved successfully! New average:", savedSong.averageRating);

    res.status(200).json({
      message: "Rating saved successfully.",
      averageRating: savedSong.averageRating
    });

  } catch (error) {
    console.error("---!!! ERROR in rateSong controller !!!---");
    console.error(error);
    res.status(500).json({ message: "Server error while rating song." });
  }
};

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
    console.log(song);

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

exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate("artist", "name profilePicture") // Also get artist avatar
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name profilePicture _id", // Get commenter's details
        },
        options: { sort: { createdAt: -1 } }, // Sort comments newest first
      });

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json(song);
  } catch (error) {
    console.error(`Error fetching song with id ${req.params.id}:`, error);
    if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid song ID format' });
    }
    res.status(500).json({ message: "Server error while fetching song." });
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

exports.downloadSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Premium protection (temporary — Stripe later)
    if (song.isPremium) {
      return res.status(403).json({
        message: "This is a premium song. Please purchase to download.",
      });
    }

    // Increment download count
    song.downloads += 1;
    await song.save();

    // Redirect to Cloudinary audio file
    return res.redirect(song.audioUrl);

  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ message: "Download failed" });
  }
};
