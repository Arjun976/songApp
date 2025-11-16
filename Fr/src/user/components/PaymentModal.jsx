// components/user/PaymentModal.jsx
import React from "react";
import Modal from "../../components/common/Modal";
import { FaCreditCard } from "react-icons/fa";

const PaymentModal = ({ isOpen, onClose, song }) => {
  const handlePayment = () => {
    // Stripe integration
    alert("Redirecting to Stripe...");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Download Premium">
      <div className="space-y-6">
        <div className="bg-gray-800/50 p-4 rounded-lg text-center">
          <p className="font-semibold text-lg">{song.title}</p>
          <p className="text-sm text-gray-400">{song.artist?.name}</p>
          <p className="text-3xl font-bold text-purple-400 mt-2">
            ${(song.price / 100).toFixed(2)}
          </p>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <FaCreditCard /> Pay with Stripe
        </button>
        <p className="text-xs text-gray-500 text-center">
          Secure payment powered by Stripe
        </p>
      </div>
    </Modal>
  );
};

export default PaymentModal;