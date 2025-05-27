'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      router.push('/');  // אם יש טוקן, מחזיר את המשתמש לדף הבית
      router.push('/profile'); // already logged in
    }
  }, [router]);

=======
>>>>>>> 7d74c89019e36353e0b150f885d803b27d6e5663
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // חשוב: לא לטעון את הדף מחדש
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

<<<<<<< HEAD
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

=======
>>>>>>> 7d74c89019e36353e0b150f885d803b27d6e5663
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b2ebf2] to-white text-gray-900 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">🔐 Login</h1>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-md px-4 py-2 mb-4 text-center">
            {error}
          </div>
        )}

<<<<<<< HEAD
        <form onKeyDown={handleKeyDown}>
=======
        <form onSubmit={handleLogin}>
>>>>>>> 7d74c89019e36353e0b150f885d803b27d6e5663
          <div className="relative mb-5">
            <input
              name="email"
              autoComplete="email"
              type="email"
              placeholder="📧 Email"
              value={formData.email}
              onChange={handleChange}
<<<<<<< HEAD
=======
              required
>>>>>>> 7d74c89019e36353e0b150f885d803b27d6e5663
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
<<<<<<< HEAD
=======
              required
>>>>>>> 7d74c89019e36353e0b150f885d803b27d6e5663
              className="px-4 py-2 pr-10 rounded-xl w-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

<<<<<<< HEAD
          <button
            type="button"
            className="w-full py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
            onClick={handleLogin}
=======
          <div className="flex justify-end mb-4">
            <a href="/reset-password" className="text-sm text-blue-700 hover:underline hover:text-blue-900">
              שכחת סיסמה?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
>>>>>>> 7d74c89019e36353e0b150f885d803b27d6e5663
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
