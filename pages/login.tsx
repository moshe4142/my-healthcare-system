'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = () => {
    const storedUsername = localStorage.getItem('username');
    const storedProfile = localStorage.getItem('profileData');
    const storedPassword = storedProfile ? JSON.parse(storedProfile).password : '';

    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem('userToken', 'demoToken');
      router.push('/');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E3F2FD] to-white text-[#0D47A1]">
      <div className="max-w-md w-full p-8 bg-white/70 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">🔐 Log In</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 px-4 py-2 rounded-xl bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 px-4 py-2 rounded-xl bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full"
        />

        <button
          onClick={handleLogin}
          className="bg-[#1E88E5] hover:bg-[#1565C0] transition px-6 py-2 rounded-xl text-white font-semibold w-full"
        >
          Log In
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-700 underline hover:text-blue-900">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
