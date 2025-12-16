// pages/Payment/Fail.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle, FaCreditCard } from "react-icons/fa";

const Fail = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-gray-900/60 backdrop-blur-xl p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border border-red-500/30">
        {/* Fail Icon */}
        <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaTimesCircle className="text-5xl text-red-400" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Payment Failed
        </h1>

        <p className="text-gray-300 mb-8">
          Sorry, we couldn't process your payment. This could be due to:
        </p>

        <ul className="text-left text-gray-400 space-y-3 mb-8">
          <li className="flex items-center gap-3">
            <FaCreditCard className="text-red-400" />
            Insufficient funds or card declined
          </li>
          <li className="flex items-center gap-3">
            <FaCreditCard className="text-red-400" />
            Incorrect card details
          </li>
          <li className="flex items-center gap-3">
            <FaCreditCard className="text-red-400" />
            Bank or network issue
          </li>
        </ul>

        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg transition"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium py-4 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          Need help? Contact support@vibeflow.com
        </p>
      </div>
    </div>
  );
};

export default Fail;