'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'; // ודא שהנתיב נכון

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      router.push('/profile');
    } catch (err) {
      console.error('Error in login:', err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div
      className={`
        min-h-screen flex items-center justify-center p-4
        transition-colors duration-500
        ${isDark
          ? 'bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-100'
          : 'bg-gradient-to-b from-[#b2ebf2] to-white text-gray-900'}
      `}
    >
      <div
        className={`
          w-full max-w-md rounded-2xl shadow-xl p-8 backdrop-blur-md
          transition-all duration-500
          ${isDark ? 'bg-white/10' : 'bg-white/80'}
        `}
      >
        <h1 className={`text-3xl font-bold text-center mb-6 ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>
          🔐 Login
        </h1>

        {error && (
          <div
            className={`
              mb-4 px-4 py-2 text-center border rounded-md transition-colors
              ${isDark
                ? 'bg-red-900 text-red-200 border-red-700'
                : 'bg-red-100 text-red-700 border-red-300'}
            `}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="relative mb-5">
            <input
              name="email"
              autoComplete="email"
              type="email"
              placeholder="📧 Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`
                px-4 py-2 rounded-xl w-full border transition-all
                ${isDark
                  ? 'bg-gray-800 border-gray-600 text-gray-100 focus:ring-blue-600'
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-300'}
                focus:outline-none focus:ring-2
              `}
            />
          </div>

          <div className="relative mb-5">
            <input
              name="password"
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="🔒 Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`
                px-4 py-2 pr-10 rounded-xl w-full border transition-all
                ${isDark
                  ? 'bg-gray-800 border-gray-600 text-gray-100 focus:ring-blue-600'
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-300'}
                focus:outline-none focus:ring-2
              `}
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className={`absolute right-3 top-3 cursor-pointer transition-colors ${
                isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <a
              href="/reset-password"
              className={`
                text-sm underline transition-colors
                ${isDark ? 'text-blue-300 hover:text-blue-100' : 'text-blue-700 hover:text-blue-900'}
              `}
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className={`
              w-full py-2 mt-2 rounded-xl transition-colors
              ${isDark
                ? 'bg-blue-700 hover:bg-blue-600 text-white'
                : 'bg-blue-700 hover:bg-blue-800 text-white'}
            `}
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{' '}
          <a
            href="/signup"
            className={`
              underline transition-colors
              ${isDark ? 'text-blue-300 hover:text-blue-100' : 'text-blue-700 hover:text-blue-900'}
            `}
          >
            Sign Up
          </a>
        </p>
        
      </div>
    </div>
  );
}
