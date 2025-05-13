'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RequestResetPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setMessage(data.message || 'Reset link sent successfully');
    } catch (err) {
      console.error('Error:', err);
      setError('Request failed. Please try again.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b2ebf2] to-white text-gray-900 p-4"
      onKeyDown={handleKeyDown}
    >
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">🔁 Reset Password</h1>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-md px-4 py-2 mb-4 text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 text-green-700 border border-green-300 rounded-md px-4 py-2 mb-4 text-center">
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="📧 Enter your email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-xl w-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-5"
        />

        <button
          className="w-full py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
          onClick={handleSubmit}
        >
          Send Reset Link
        </button>

        <div className="text-sm text-center mt-4">
          <a href="/login" className="text-blue-700 underline hover:text-blue-900">
             Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
