// routes/admin.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { getAllUsers, banUser, deleteUser, deleteSong } = require("../controllers/adminController");

// All admin routes require "admin" role
router.use(auth, role("admin"));

router.get("/users", getAllUsers);
router.put("/users/:id/ban", banUser);
router.delete("/users/:id", deleteUser);
router.delete("/songs/:id", deleteSong);

module.exports = router;