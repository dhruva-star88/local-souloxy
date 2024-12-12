import React from "react";
import { Link } from "react-router-dom"; // If using React Router for navigation
import profile from "../assets/images/sample.jpg";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-lime-200 via-green-200 to-lime-200 text-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-4 px-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img
            src="/path-to-logo.png"
            alt="Logo"
            className="h-12 w-12 rounded-full border-2 border-green-300 shadow-md"
          />
          <span className="text-2xl font-bold text-green-800">SOULOXY</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/dashboard"
            className="hover:text-green-600 font-medium text-lg transition duration-200 ease-in-out"
          >
            Dashboard
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            to="/appointments"
            className="hover:text-green-600 font-medium text-lg transition duration-200 ease-in-out"
          >
            Appointments
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            to="/message-area"
            className="hover:text-green-600 font-medium text-lg transition duration-200 ease-in-out"
          >
            Message Area
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            to="/learning-hub"
            className="hover:text-green-600 font-medium text-lg transition duration-200 ease-in-out"
          >
            Learning Hub
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            to="/calendar"
            className="hover:text-green-600 font-medium text-lg transition duration-200 ease-in-out"
          >
            Calendar
          </Link>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center space-x-4">
          {/* Profile Icon */}
          <div className="relative group">
            {/* Rotating Gradient Ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-400 via-lime-400 to-green-600 opacity-90 animate-spin-slow group-hover:animate-spin-fast transition-all duration-300"></div>
            {/* Glow Effect */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-300 to-transparent blur-md opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <img
              src={profile}
              alt="Profile"
              className="relative h-14 w-14 rounded-full border-2 border-white shadow-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
