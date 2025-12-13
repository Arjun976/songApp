// pages/Auth/Login.jsx
import React, { useState, useContext } from "react";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const { success, data, error: loginError } = await login({ email, password });

      if (!success) {
        throw new Error(loginError || "Login failed");
      }

      console.log("Logged in as:", data.user.name, "Role:", data.user.role);

      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else if (data.user.role === "artist") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-gray-900/60 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700/40">
        <h1 className="text-3xl font-bold text-center text-gray-300 mb-8">
          Welcome Back
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/70 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-center mb-6 animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email ID</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-black/40 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 pr-12 rounded-lg bg-black/40 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-purple-400 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <Link
            to="/forgot-password"
            className="text-sm text-purple-400 hover:text-purple-300 transition"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-700" />
          <span className="text-gray-400 mx-3 text-sm">or</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 text-white py-3 rounded-lg border border-gray-700 transition">
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 text-white py-3 rounded-lg border border-gray-700 transition">
            <FaFacebook className="text-blue-500" /> Continue with Facebook
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-center mt-6 text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:text-purple-300 font-semibold transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;