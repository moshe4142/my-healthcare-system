'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: fullName, phone_number: phoneNumber, email, date_of_birth: dob, address, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Optionally store user data (e.g., userId, etc.)
      alert('Registration successful!');
      router.push('/login');
    } else {
      setError(data.message || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E3F2FD] text-[#1565C0] px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <input
          type="text"
          placeholder="Full Name"
          className="mb-4 px-4 py-2 rounded bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="mb-4 px-4 py-2 rounded bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="mb-4 px-4 py-2 rounded bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          className="mb-4 px-4 py-2 rounded bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <textarea
          placeholder="Address"
          className="mb-4 px-4 py-2 rounded bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 px-4 py-2 rounded bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="mb-6 px-4 py-2 rounded bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="bg-[#26A69A] hover:bg-[#2196F3] transition duration-200 px-6 py-2 rounded text-white font-semibold w-full"
        >
          Register
        </button>
      </div>
    </div>
  );
}
