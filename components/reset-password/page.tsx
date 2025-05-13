'use client';
import React, { useState } from 'react';

export default function RequestResetPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setSuccess('');
    setError('');

    try {
      const res = await fetch('/api/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Request failed');
        return;
      }

      setSuccess('Check your email for password reset instructions.');
      setEmail('');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b2ebf2] to-white text-gray-900 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">🔁 Reset Password</h1>

        {success && (
          <div className="bg-green-100 text-green-700 border border-green-300 rounded-md px-4 py-2 mb-4 text-center">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-md px-4 py-2 mb-4 text-center">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="📧 Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
