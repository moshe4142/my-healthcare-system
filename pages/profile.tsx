'use client';
import React, { useState } from 'react';

export default function ProfilePage() {
  const [fullName, setFullName] = useState('John Doe');
  const [dob, setDob] = useState('1990-01-01');
  const [phone, setPhone] = useState('123-456-7890');
  const [email, setEmail] = useState('john.doe@example.com');
  const [address, setAddress] = useState('123 Main St, Springfield');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // alert('Profile updated successfully!');
    setIsEditing(false); // Disable editing after save
  };

  return (
    <div className="p-8 bg-[#F9F9F9] min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">My Profile</h1>
      <p className="text-lg text-gray-600 mb-6">Welcome back! Update your information or view your details.</p>

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl mx-auto">
        {/* Full Name */}
        <div className="flex items-center justify-between">
          <label htmlFor="fullName" className="text-lg font-medium text-gray-800">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 p-3 w-full sm:w-96 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <span className="text-gray-600">{fullName}</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="flex items-center justify-between">
          <label htmlFor="dob" className="text-lg font-medium text-gray-800">Date of Birth</label>
          {isEditing ? (
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="mt-2 p-3 w-full sm:w-96 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <span className="text-gray-600">{dob}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex items-center justify-between">
          <label htmlFor="phone" className="text-lg font-medium text-gray-800">Phone Number</label>
          {isEditing ? (
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 p-3 w-full sm:w-96 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <span className="text-gray-600">{phone}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center justify-between">
          <label htmlFor="email" className="text-lg font-medium text-gray-800">Email Address</label>
          {isEditing ? (
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 w-full sm:w-96 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <span className="text-gray-600">{email}</span>
          )}
        </div>

        {/* Address */}
        <div className="flex items-center justify-between">
          <label htmlFor="address" className="text-lg font-medium text-gray-800">Home Address</label>
          {isEditing ? (
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 p-3 w-full sm:w-96 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          ) : (
            <span className="text-gray-600">{address}</span>
          )}
        </div>

        {/* Save and Edit buttons */}
        <div className="flex justify-between items-center">
          {isEditing ? (
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
