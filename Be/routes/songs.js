// routes/songs.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { uploadSong, getAllSongs, getMySongs, search, deleteSong } = require("../controllers/songController");

// GET /api/songs/search → public
router.get("/search", search);

// GET /api/songs → public (everyone can see songs)
router.get("/", getAllSongs);

// GET /api/songs/my → only the artist sees their songs
router.get("/my", auth, getMySongs);

// DELETE /api/songs/:id → admin only
router.delete("/:id", auth, role("admin"), deleteSong);

// Import multer upload middleware
const { upload } = require("../utils/cloudinary");

router.post(
  "/upload",
  auth,
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  uploadSong
);

module.exports = router;
