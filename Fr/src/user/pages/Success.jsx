// pages/Payment/Success.jsx
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaMusic, FaDownload } from "react-icons/fa";

const Success = () => {
  const [searchParams] = useSearchParams();
  const songTitle = searchParams.get("song") || "Premium Song";
  const price = searchParams.get("price") || "1.99";

  useEffect(() => {
    // Optional: Track successful purchase
    console.log("Payment successful for:", songTitle);
  }, [songTitle]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-gray-900/60 backdrop-blur-xl p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border border-green-500/30">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-5xl text-green-400" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-300 mb-2">
          Congratulations! You now own:
        </p>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl mb-8">
          <div className="flex items-center justify-center gap-4">
            <FaMusic className="text-3xl text-white" />
            <div className="text-left">
              <p className="text-xl font-semibold text-white">{songTitle}</p>
              <p className="text-sm text-white/80">Premium Download Unlocked</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-white mt-4">${price}</p>
        </div>

        <p className="text-gray-400 mb-8">
          Your download is ready. You can access it anytime from your profile.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/profile"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-3 transition"
          >
            <FaDownload /> Go to Downloads
          </Link>

          <Link
            to="/home"
            className="border border-gray-600 hover:border-purple-500 text-gray-300 hover:text-white font-medium py-4 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;