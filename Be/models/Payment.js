// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  song: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
  amount: { type: Number, required: true }, // in cents
  stripeChargeId: String,
  status: { type: String, default: "completed" },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);