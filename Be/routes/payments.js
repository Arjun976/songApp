const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const paymentController = require("../controllers/paymentController");
const User = require("../models/User");

// This is a direct, non-payment purchase for testing/legacy if needed.
// The main flow should use Stripe.
router.post("/purchase", auth, async (req, res) => {
  try {
    const { songId } = req.body;
    if (!songId) {
      return res.status(400).json({ message: "Song ID required" });
    }
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { purchasedSongs: songId },
    });
    res.json({ message: "Song purchased successfully" });
  } catch (error) {
    console.error("Purchase error:", error);
    res.status(500).json({ message: "Purchase failed" });
  }
});

// Stripe Checkout Session
router.post(
  "/create-checkout-session",
  auth,
  paymentController.createCheckoutSession
);

// Verify Stripe Checkout Session (client-side alternative to webhooks)
router.get(
    "/verify-session/:sessionId",
    auth,
    paymentController.verifyCheckoutSession
);

module.exports = router;


