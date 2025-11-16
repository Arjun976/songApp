// pages/Auth/Register.jsx
import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash, FaUser, FaMusic } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // user or artist
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    // TODO: API call to register
    console.log("Register:", formData);
    navigate(formData.role === "artist" ? "/artist/dashboard" : "/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-gray-900/60 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700/40">
        <h1 className="text-3xl font-bold text-center text-gray-300 mb-8">
          Create an Account
        </h1>

        {/* Role Selection */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => handleRoleChange("user")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full transition ${
              formData.role === "user"
                ? "bg-purple-600 text-white"
                : "bg-black/40 text-gray-400 border border-gray-700"
            }`}
          >
            <FaUser /> Listener
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("artist")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full transition ${
              formData.role === "artist"
                ? "bg-purple-600 text-white"
                : "bg-black/40 text-gray-400 border border-gray-700"
            }`}
          >
            <FaMusic /> Artist
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-black/40 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-black/40 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 pr-12 rounded-lg bg-black/40 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-purple-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-gray-300 text-sm mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full p-3 pr-12 rounded-lg bg-black/40 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-purple-400"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-700" />
          <span className="text-gray-400 mx-3 text-sm">or</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        {/* Social Signup */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 text-white py-3 rounded-lg border border-gray-700 transition">
            <FaGoogle className="text-red-500" /> Sign up with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 text-white py-3 rounded-lg border border-gray-700 transition">
            <FaFacebook className="text-blue-500" /> Sign up with Facebook
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;