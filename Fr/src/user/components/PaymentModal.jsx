// components/user/PaymentModal.jsx
import React, { useState } from "react";
import Modal from "../../components/common/Modal";
import { FaCreditCard, FaSpinner } from "react-icons/fa";
import { createCheckoutSession } from "../../api/payments"; // Ensure this path is correct

const PaymentModal = ({ isOpen, onClose, song }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Create a checkout session on the backend.
      // The backend now returns the full URL for the checkout page.
      const checkoutUrl = await createCheckoutSession(song._id);

      // 2. Redirect the user to the Stripe Checkout page.
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("Could not get checkout URL.");
      }
    } catch (err) {
      console.error("Payment failed:", err);
      setError(err.message || "Failed to initiate payment.");
      setLoading(false); // Stop loading on failure
    }
  };

  // Reset state when modal is closed
  const handleClose = () => {
    setError(null);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Download Premium Song">
      <div className="space-y-4">
        <div className="bg-gray-800/50 p-4 rounded-lg text-center">
          <p className="font-semibold text-lg">{song.title}</p>
          <p className="text-sm text-gray-400">{song.artist?.name}</p>
          <p className="text-3xl font-bold text-purple-400 mt-2">
            ${(song.price / 100).toFixed(2)}
          </p>
        </div>

        {error && (
            <div className="bg-red-900/50 text-red-300 p-3 rounded-lg text-sm text-center">
                <p className="font-semibold">Payment Error</p>
                <p>{error}</p>
            </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Processing...
            </>
          ) : (
            <>
              <FaCreditCard /> Pay with Stripe
            </>
          )}
        </button>
        <p className="text-xs text-gray-500 text-center">
          You will be redirected to a secure payment page powered by Stripe.
        </p>
      </div>
    </Modal>
  );
};

export default PaymentModal;