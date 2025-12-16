// routes/playlists.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createPlaylist,
  getMyPlaylists,
  getPlaylistById,
  addSongToPlaylist,
  deletePlaylist,
} = require("../controllers/playlistController");

// POST /api/playlists → create new playlist
router.post("/", auth, createPlaylist);

// GET /api/playlists/my → get user's playlists
router.get("/my", auth, getMyPlaylists);

// GET /api/playlists/:id → get playlist by ID
router.get("/:id", auth, getPlaylistById);

// POST /api/playlists/:id/songs → add song to playlist
router.post("/:id/songs", auth, addSongToPlaylist);

// routes/playlists.js
router.delete("/:id", auth, deletePlaylist);


module.exports = router;