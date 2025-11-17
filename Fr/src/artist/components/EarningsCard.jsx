// artist/components/EarningsCard.jsx
import React from "react";
import Button from "../../components/ui/Button";

const EarningsCard = ({ onRequestPayout }) => {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white">
      <h3 className="text-xl font-bold">Available Earnings</h3>
      <p className="text-4xl font-bold mt-2">$3,450.00</p>
      <p className="text-sm opacity-90 mt-1">Ready for payout</p>
      <Button variant="secondary" className="mt-4" onClick={onRequestPayout}>
        Request Payout
      </Button>
    </div>
  );
};

export default EarningsCard;