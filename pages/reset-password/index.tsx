'use client';
import { useState } from 'react';

export default function RequestResetPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/request-password-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#b2ebf2] to-white">
      <div className="max-w-md w-full bg-white/90 rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Forgot your password?</h1>
        <input
          type="email"
          className="w-full p-2 border rounded-xl mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-700 text-white py-2 rounded-xl hover:bg-blue-800"
        >
          Send Reset Link
        </button>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}
