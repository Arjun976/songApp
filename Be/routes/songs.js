// routes/songs.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { uploadSong, getAllSongs, getMySongs, search } = require("../controllers/songController");

// GET /api/songs/search → public
router.get("/search", search);

// GET /api/songs → public (everyone can see songs)
router.get("/", getAllSongs);

// GET /api/songs/my → only the artist sees their songs
router.get("/my", auth, getMySongs);

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
