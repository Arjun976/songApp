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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://symphonydb.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // SUCCESS! Save token and auto-login
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Registered as:", data.user.name, "Role:", data.user.role);

      // Redirect based on role
      if (data.user.role === "artist") {
        navigate("/dashboard");
      } else if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
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
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                : "bg-black/40 text-gray-400 border border-gray-700 hover:border-purple-500"
            }`}
          >
            <FaUser /> Listener
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("artist")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full transition ${
              formData.role === "artist"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-black/40 text-gray-400 border border-gray-700 hover:border-purple-500"
            }`}
          >
            <FaMusic /> Artist
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/70 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-center mb-6 animate-pulse">
            {error}
          </div>
        )}

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
              className="absolute right-3 top-10 text-gray-400 hover:text-purple-400 transition"
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
              className="absolute right-3 top-10 text-gray-400 hover:text-purple-400 transition"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:purple-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
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
            to="/"
            className="text-purple-400 hover:text-purple-300 font-semibold transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;