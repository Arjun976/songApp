// artist/components/PayoutModal.jsx
import React from "react";
import Modal from "../../components/common/Modal";
import Button from "../../components/ui/Button";

const PayoutModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Payout">
      <div className="space-y-6">
        <div className="bg-gray-800/50 p-6 rounded-xl text-center">
          <p className="text-4xl font-bold text-green-400">$3,450.00</p>
          <p className="text-gray-400 mt-2">Available for withdrawal</p>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-gray-400">
            Payouts are processed via PayPal or Bank Transfer within 3–5 business days.
          </p>
          <Button className="w-full" onClick={onClose}>
            Request $3,450.00
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PayoutModal;