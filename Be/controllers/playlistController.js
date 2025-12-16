// controllers/playlistController.js
const Playlist = require("../models/Playlist");

exports.createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const playlist = await Playlist.create({
      name,
      user: req.user.id,
      songs: [],
    });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to create playlist" });
  }
};

exports.getMyPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id }).populate("songs");
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching playlists" });
  }
};

exports.getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate({
      path: "songs",
      populate: {
        path: "artist",
        model: "User",
      },
    });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching playlist" });
  }
};


exports.addSongToPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });
    if (playlist.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (!playlist.songs.includes(req.body.songId)) {
      playlist.songs.push(req.body.songId);
      await playlist.save();
    }

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Error adding song" });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // ownership check
    if (playlist.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this playlist" });
    }

    await playlist.deleteOne();

    res.json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Delete playlist error:", error);
    res.status(500).json({ message: "Failed to delete playlist" });
  }
};
