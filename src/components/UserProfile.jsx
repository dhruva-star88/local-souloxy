import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom"; // If using React Router for navigation
import { FaUserEdit, FaCog, FaCreditCard, FaLifeRing, FaSignOutAlt } from "react-icons/fa"; // FontAwesome Icons
import profile from "../assets/images/sample.jpg";

const UserProfile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={profileRef} className="relative">
      <div onClick={toggleDropdown} className="cursor-pointer relative group">
        {/* Rotating Gradient Ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-400 via-lime-400 to-green-600 opacity-90 animate-spin-slow group-hover:animate-spin-fast transition-all duration-300"></div>
        {/* Glow Effect */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-300 to-transparent blur-md opacity-70 group-hover:opacity-100 transition duration-300"></div>
        <img
          src={profile}
          alt="Profile"
          className="relative h-14 w-14 rounded-full border-2 border-white shadow-lg"
        />
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="py-1">
            <li>
              <Link
                to="/edit-profile"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaUserEdit className="mr-2" /> Edit Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaCog className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              <Link
                to="/billing"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaCreditCard className="mr-2" /> Billing & Payments
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaLifeRing className="mr-2" /> Help & Support
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
