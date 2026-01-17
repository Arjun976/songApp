// pages/Auth/ForgotPassword.jsx
import React, { useState } from "react";
import { FaEnvelope, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      // TODO: Replace with actual API call
      // await fetch('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });
      console.log("Password reset request for:", email);

      // Simulate success
      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again."+ err.message);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="bg-gray-900/60 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-md text-center border border-gray-700/40">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
            <FaCheckCircle className="text-4xl text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Check Your Email
          </h2>
          <p className="text-gray-300 text-sm mb-6">
            We’ve sent a password reset link to
            <br />
            <span className="text-purple-400 font-medium">{email}</span>
          </p>
          <p className="text-xs text-gray-500 mb-6">
            Didn’t receive it? Check spam or try again.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            <FaArrowLeft /> Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-gray-900/60 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700/40">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/login"
            className="text-gray-400 hover:text-purple-400 transition"
          >
            <FaArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-300">Forgot Password?</h1>
          <div className="w-6" /> {/* Spacer */}
        </div>

        <p className="text-gray-400 text-sm text-center mb-8">
          Enter your email and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              <FaEnvelope className="inline mr-2 text-purple-400" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-black/40 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition placeholder-gray-500"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 px-4 rounded-lg border border-red-500/30">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <FaEnvelope /> Send Reset Link
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300 font-semibold"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;