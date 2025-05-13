'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ResetWithTokenPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleReset = async () => {
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Password reset failed');
        return;
      }

      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b2ebf2] to-white text-gray-900 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">🔒 Set New Password</h1>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-md px-4 py-2 mb-4 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 border border-green-300 rounded-md px-4 py-2 mb-4 text-center">
            {success}
          </div>
        )}

        <div className="relative mb-5">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="🔐 New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 pr-10 rounded-xl w-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="relative mb-5">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="🔐 Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2 pr-10 rounded-xl w-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
