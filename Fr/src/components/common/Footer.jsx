// components/common/Footer.jsx
import React from "react";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black/90 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">TuneFlow</h3>
            <p className="text-sm">Stream. Create. Earn.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-purple-400 font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-purple-300">About</a></li>
              <li><a href="/privacy" className="hover:text-purple-300">Privacy</a></li>
              <li><a href="/terms" className="hover:text-purple-300">Terms</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-purple-400 font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-purple-400"><FaGithub /></a>
              <a href="#" className="text-2xl hover:text-purple-400"><FaTwitter /></a>
              <a href="#" className="text-2xl hover:text-purple-400"><FaInstagram /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} TuneFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;