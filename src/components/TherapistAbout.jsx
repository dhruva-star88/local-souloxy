import React from 'react';
import { FaUser, FaMapMarkerAlt, FaGraduationCap, FaBrain, FaClock } from 'react-icons/fa';

const TherapistAbout = ({ name, bio, qualifications, experience, focus, location }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 border border-blue-200">
      {/* Title Section */}
      <h1 className="text-3xl font-extrabold text-blue-800 flex items-center mb-4">
        <FaUser className="mr-2 text-blue-600" />
        Personal Info
      </h1>

      {/* Bio Section */}
      <p className="text-gray-800 mb-6 leading-relaxed text-lg">
        {bio}
      </p>

      {/* Details Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-base">
        {/* Qualifications */}
        <div className="flex items-center space-x-3">
          <FaGraduationCap className="text-blue-600 text-xl" />
          <p>
            <strong className="text-blue-800">Qualifications:</strong> {qualifications}
          </p>
        </div>

        {/* Experience */}
        <div className="flex items-center space-x-3">
          <FaClock className="text-blue-600 text-xl" />
          <p>
            <strong className="text-blue-800">Experience:</strong> {experience}
          </p>
        </div>

        {/* Focus */}
        <div className="flex items-center space-x-3">
          <FaBrain className="text-blue-600 text-xl" />
          <p>
            <strong className="text-blue-800">Focus:</strong> {focus}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-blue-600 text-xl" />
          <p>
            <strong className="text-blue-800">Location:</strong> {location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TherapistAbout;
