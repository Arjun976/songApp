// pages/Payment/Success.jsx
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaMusic, FaDownload, FaSpinner, FaExclamationCircle } from "react-icons/fa";
import { verifyPaymentSession } from "../../api/payments"; // Assuming this is the correct path

const Success = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [songUrl, setSongUrl] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setError("No session ID found. Cannot verify payment.");
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const data = await verifyPaymentSession(sessionId);
        setSongUrl(data.songUrl);
      } catch (err) {
        setError(err.message || "An error occurred during payment verification.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <FaSpinner className="animate-spin text-5xl text-purple-500 mb-4" />
        <p className="text-xl">Verifying your payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-gray-900/60 backdrop-blur-xl p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border border-red-500/30">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExclamationCircle className="text-5xl text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Verification Failed</h1>
          <p className="text-gray-300 mb-8">{error}</p>
          <Link
            to="/home"
            className="border border-gray-600 hover:border-purple-500 text-gray-300 hover:text-white font-medium py-4 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-gray-900/60 backdrop-blur-xl p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border border-green-500/30">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-5xl text-green-400" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-300 mb-6">
          Congratulations! Your premium song is unlocked and ready for download.
        </p>
        
        <div className="flex flex-col gap-4">
          {songUrl ? (
            <a
              href={songUrl}
              download
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-3 transition"
            >
              <FaDownload /> Download Now
            </a>
          ) : (
             <p className="text-yellow-400">Could not retrieve download link.</p>
          )}

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