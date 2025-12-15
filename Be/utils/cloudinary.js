// utils/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("---!!! Cloudinary environment variables missing! Please check your .env file. !!!---");
  console.error("Required: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

// Set up storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isAudio = file.mimetype.startsWith("audio");

    return {
      folder: isAudio ? "vibeflow/audio" : "vibeflow/covers",
      resource_type: "auto",
      public_id: `${file.fieldname}-${Date.now()}`,
    };
  },
});

// Multer instance
const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };