// index.js  (or server.js)
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

// Load environment variables first
dotenv.config();

const app = express();

// Middleware
app.use(cors());                    // Allow frontend to connect
app.use(morgan("dev"));             // Log requests in console
app.use(express.json());            // Parse JSON bodies for all other routes

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/songs", require("./routes/songs"));
app.use("/api/users", require("./routes/users"));
app.use("/api/playlists", require("./routes/playlists"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/admin", require("./routes/admin"));


// ================== SERVE FRONTEND ==================
// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, "../Fr/dist")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Fr/dist/index.html"));
});
// =================================================


// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("--- GLOBAL ERROR HANDLER CAUGHT AN ERROR ---");
  console.error("Error Message:", err.message);
  if (err.stack) {
    console.error("Stack Trace:", err.stack);
  }
  console.error("Full Error Object:", err);

  const statusCode = err.status || 500;
  const errorMessage = err.message || "An unknown server error occurred.";

  res.status(statusCode).json({
    message: "Server Error",
    error: errorMessage,
  });
});

// Optional: Simple test route
app.get("/", (req, res) => {
  res.json({ message: "VibeFlow API is running!" });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Stop server if DB fails
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test it: http://localhost:${PORT}`);
});