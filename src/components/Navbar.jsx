import React from "react";
import { Link } from "react-router-dom"; // If using React Router for navigation
import UserProfile from "./UserProfile"; // Import UserProfile component

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
        <UserProfile />
      </div>
    </nav>
  );
};

export default Navbar;
