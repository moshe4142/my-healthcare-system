'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
<<<<<<< HEAD
      router.push('/');  // אם יש טוקן, מחזיר את המשתמש לדף הבית
=======
      router.push('/profile'); // already logged in
>>>>>>> f67ec3376ce37ff51fd42925b0620e0b2eaf9090
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);  // הדפסת התשובה מה-API

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // אם יש טוקן, נשמור אותו ב-localStorage
      if (data.token) {
        localStorage.setItem('userToken', data.token);
      }

      // שמירה של פרטי המשתמש
      if (data.user) {
        localStorage.setItem('profileData', JSON.stringify(data.user));
      }

      // הפנייה לעמוד פרופיל
      router.push('/profile');
    } catch (err) {
      console.error('Error in login:', err);  // הדפס את השגיאה
      setError('Login failed. Please try again.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b2ebf2] to-white text-gray-900 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">🔐 Login</h1>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-md px-4 py-2 mb-4 text-center">
            {error}
          </div>
        )}

        <form onKeyDown={handleKeyDown}>
          <div className="relative mb-5">
            <input
              name="email"
              autoComplete="email"
              type="email"
              placeholder="📧 Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 rounded-xl w-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
            type="button"
            className="w-full py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-blue-700 underline hover:text-blue-900 mr-2">
            Sign Up
          </a>{' '}
          |{' '}
          <a href="/reset-password" className="text-blue-700 underline hover:text-blue-900 ml-2">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
}
