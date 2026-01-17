// controllers/paymentController.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Song = require("../models/Song");
const User = require("../models/User");

// Create a Stripe checkout session
exports.createCheckoutSession = async (req, res, next) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id; // from auth middleware

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }

    if (!song.isPremium || !song.price) {
      return res
        .status(400)
        .json({ message: "This song is not for sale." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: song.title,
              images: [song.thumbnailUrl],
              metadata: {
                artist: song.artist.name, // Assuming artist is populated or storing name
              },
            },
            unit_amount: song.price, // Price in cents
          },
          quantity: 1,
        },
      ],
      client_reference_id: userId,
      metadata: {
        songId: song._id.toString(),
      },
      // The frontend will use the session_id from the URL to verify payment
      success_url: `https://songapp-1.onrender.com/payment/success`,
      cancel_url: `https://songapp-1.onrender.com/fail`,
    });

    // Return the full URL for the frontend to redirect to.
    res.status(200).json({ checkoutUrl: session.url });
  } catch (error) {
    next(error);
  }
};

// Verify the session on the client-side as an alternative to webhooks
exports.verifyCheckoutSession = async (req, res, next) => {
    try {
        const { sessionId } = req.params;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.status === 'complete' && session.payment_status === 'paid') {
            const userId = session.client_reference_id;
            const { songId } = session.metadata;

            if (!userId || !songId) {
                return res.status(400).json({ message: 'Session is missing required data.' });
            }

            // Check if user already owns the song to prevent duplicate processing
            const user = await User.findById(userId);
            if (user.purchasedSongs.includes(songId)) {
                const song = await Song.findById(songId);
                return res.status(200).json({ 
                    message: 'Purchase already fulfilled.',
                    songUrl: song ? song.audioUrl : null
                });
            }

            // Fulfill the purchase
            await User.findByIdAndUpdate(userId, {
                $addToSet: { purchasedSongs: songId },
            });

            const song = await Song.findById(songId);
            if (!song) {
                // This case is unlikely if the checkout session was created with a valid songId
                return res.status(404).json({ message: "Song not found after purchase." });
            }

            console.log(`Successfully fulfilled purchase for user ${userId} and song ${songId} via client-side verification.`);
            
            return res.status(200).json({ 
                message: 'Payment successful and purchase fulfilled.',
                songUrl: song.audioUrl 
            });
        } else {
            return res.status(400).json({ message: 'Payment not successful.' });
        }
    } catch (error) {
        next(error);
    }
};