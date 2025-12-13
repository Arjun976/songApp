// utils/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    // Different folders for audio and images
    const folder = file.mimetype.startsWith("audio") ? "vibeflow/audio" : "vibeflow/covers";
    return {
      folder: folder,
      allowed_formats: file.mimetype.startsWith("audio") ? ["mp3", "wav", "ogg"] : ["jpg", "jpeg", "png", "webp"],
      resource_type: file.mimetype.startsWith("audio") ? "video" : "image",
      public_id: `${file.fieldname}-${Date.now()}`,
    };
  },
});

// Multer instance
const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };