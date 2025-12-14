// models/User.js  ← THIS IS THE ONLY VERSION THAT WORKS RIGHT NOW
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");   // ← MUST BE bcryptjs

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "artist", "admin"],
      default: "user",
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song"
    }],
    profilePicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// THIS IS THE MOST IMPORTANT PART — HASH PASSWORD
userSchema.pre("save", async function () {
  // Only hash if password is new or modified
  if (!this.isModified("password")) {
    return; // Mongoose will proceed automatically for async hooks
  }

  try {
    const salt = await bcryptjs.genSalt(12);
    this.password = await bcryptjs.hash(this.password, salt);
  } catch (error) {
    throw error; // Mongoose will catch this error
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);