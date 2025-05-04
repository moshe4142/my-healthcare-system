'use client';
import React, { useState, ChangeEvent } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';

export default function ProfilePage() {
  const [fullName, setFullName] = useState('John Doe');
  const [dob, setDob] = useState('1990-01-01');
  const [phone, setPhone] = useState('123-456-7890');
  const [email, setEmail] = useState('john.doe@example.com');
  const [address, setAddress] = useState('123 Main St, Springfield');
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState('/avatar.png'); // default image path

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-[#e0f7fa] to-white min-h-screen text-gray-800">
      <h1 className="text-4xl font-bold mb-2">My Profile</h1>
      <p className="text-lg text-gray-600 mb-8">Welcome back! Update your information or view your details.</p>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-8">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="relative group">
            <img
              src={avatar}
              alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-white shadow object-cover"
            />
            {isEditing && (
              <>
                <label htmlFor="avatarUpload" className="absolute bottom-0 right-0 bg-teal-500 p-2 rounded-full cursor-pointer hover:bg-teal-400 transition-opacity opacity-80 group-hover:opacity-100">
                  <PencilIcon className="w-4 h-4 text-white" />
                </label>
                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </>
            )}
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Full Name */}
          <FormRow label="Full Name">
            {isEditing ? (
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
            ) : (
              <StaticText>{fullName}</StaticText>
            )}
          </FormRow>

          {/* DOB */}
          <FormRow label="Date of Birth">
            {isEditing ? (
              <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            ) : (
              <StaticText>{dob}</StaticText>
            )}
          </FormRow>

          {/* Phone */}
          <FormRow label="Phone Number">
            {isEditing ? (
              <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            ) : (
              <StaticText>{phone}</StaticText>
            )}
          </FormRow>

          {/* Email */}
          <FormRow label="Email Address">
            {isEditing ? (
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            ) : (
              <StaticText>{email}</StaticText>
            )}
          </FormRow>

          {/* Address */}
          <FormRow label="Home Address">
            {isEditing ? (
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="mt-2 p-3 w-full bg-gray-50 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <StaticText>{address}</StaticText>
            )}
          </FormRow>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-md transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 hover:bg-gray-300 text-white px-6 py-2 rounded-md transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-md transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable components
function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-md font-semibold text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
}

function Input({ type = 'text', value, onChange }: { type?: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="mt-1 p-3 w-full bg-gray-50 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  );
}

function StaticText({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600 mt-1">{children}</p>;
}
