import React, { useState } from 'react';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    qualifications: "PhD in Clinical Psychology, Licensed Professional Counselor (LPC)",
    experience: "10+ years in Cognitive Behavioral Therapy (CBT) and Mindfulness-Based Stress Reduction (MBSR)",
    focus: "Anxiety, Stress Management, and Mindfulness",
    location: "New York City, NY",
    profileImage: null,
    email: "example@example.com",
    contactNumber: "1234567890",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevState) => ({
          ...prevState,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    // Here you can send the updated profile data to the server
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
        <div className="flex justify-between items-center">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
            <label htmlFor="profileImage">
              <div className="w-20 h-20 rounded-full border-2 border-blue-500 overflow-hidden cursor-pointer">
                {profileData.profileImage ? (
                  <img
                    src={profileData.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-500 text-white flex justify-center items-center text-lg">
                    <span>Upload</span>
                  </div>
                )}
              </div>
            </label>
            <span className="text-xl text-blue-700">Edit Profile</span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* First and Last Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="text-lg font-semibold text-blue-700">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={profileData.firstName || ""}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg border-blue-300"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-lg font-semibold text-blue-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={profileData.lastName || ""}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg border-blue-300"
              />
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <label htmlFor="qualifications" className="text-lg font-semibold text-blue-700">Qualifications</label>
            <input
              type="text"
              id="qualifications"
              name="qualifications"
              value={profileData.qualifications}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg border-blue-300"
            />
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="text-lg font-semibold text-blue-700">Experience</label>
            <textarea
              id="experience"
              name="experience"
              value={profileData.experience}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg border-blue-300"
              rows="4"
            />
          </div>

          {/* Focus Areas */}
          <div>
            <label htmlFor="focus" className="text-lg font-semibold text-blue-700">Focus Areas</label>
            <input
              type="text"
              id="focus"
              name="focus"
              value={profileData.focus}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg border-blue-300"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="text-lg font-semibold text-blue-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={profileData.location}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg border-blue-300"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="text-lg font-semibold text-blue-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg border-blue-300"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="text-lg font-semibold text-blue-700">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={profileData.contactNumber}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg border-blue-300"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
