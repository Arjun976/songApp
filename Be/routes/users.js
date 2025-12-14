// routes/users.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { upload } = require("../utils/cloudinary");
const { getProfile, getUserStats, toggleFavorite, getFavoriteSongs, updateProfile } = require("../controllers/userController");

// GET /api/users/profile → get logged-in user info
router.get("/profile", auth, getProfile);

// PUT /api/users/profile → update user profile
router.put("/profile", auth, upload.single("profilePicture"), updateProfile);

// GET /api/users/stats → get user stats
router.get("/stats", auth, getUserStats);

// POST /api/users/favorites → toggle favorite song
router.post("/favorites", auth, toggleFavorite);

// GET /api/users/favorites → get favorite songs
router.get("/favorites", auth, getFavoriteSongs);

module.exports = router;