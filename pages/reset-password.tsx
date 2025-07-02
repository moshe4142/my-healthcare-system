'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../context/ThemeContext';

export default function RequestResetPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/request-password-reset', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setMessage(data.message || 'Reset link sent successfully');
        setEmail('');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div
      className={`
        min-h-screen flex items-center justify-center p-4 transition-colors
        ${isDark
          ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100'
          : 'bg-gradient-to-b from-[#b2ebf2] to-white text-gray-900'}
      `}
      onKeyDown={handleKeyDown}
    >
      <form
        onSubmit={handleSubmit}
        className={`
          w-full max-w-md backdrop-blur-md rounded-2xl shadow-xl p-8 transition-colors
          ${isDark ? 'bg-white/10' : 'bg-white/80'}
        `}
      >
        <h1 className={`text-3xl font-bold text-center mb-6 transition-colors ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>
          🔁 Reset Password
        </h1>

        {error && (
          <div
            className={`
              border rounded-md px-4 py-2 mb-4 text-center transition-colors
              ${isDark
                ? 'bg-red-900 text-red-200 border-red-700'
                : 'bg-red-100 text-red-700 border-red-300'}
            `}
          >
            {error}
          </div>
        )}

        {message && (
          <div
            className={`
              border rounded-md px-4 py-2 mb-4 text-center transition-colors
              ${isDark
                ? 'bg-green-900 text-green-200 border-green-700'
                : 'bg-green-100 text-green-700 border-green-300'}
            `}
          >
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="📧 Enter your email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`
            px-4 py-2 rounded-xl w-full border mb-5 transition-all
            ${isDark
              ? 'bg-gray-800 border-gray-600 text-gray-100 focus:ring-blue-600'
              : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-300'}
            focus:outline-none focus:ring-2
          `}
        />

        <button
          type="submit"
          disabled={!email || loading}
          className={`
            w-full py-2 rounded-xl transition disabled:opacity-50
            ${isDark
              ? 'bg-blue-700 text-white hover:bg-blue-600'
              : 'bg-blue-700 text-white hover:bg-blue-800'}
          `}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <div className="text-sm text-center mt-4">
          <a
            href="/login"
            className={`
              underline transition-colors
              ${isDark ? 'text-blue-300 hover:text-blue-100' : 'text-blue-700 hover:text-blue-900'}
            `}
          >
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );
}
