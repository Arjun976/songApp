// routes/payments.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createPaymentIntent } = require("../controllers/paymentController");

// POST /api/payments/create-intent → for premium song download
router.post("/create-intent", auth, createPaymentIntent);

module.exports = router;