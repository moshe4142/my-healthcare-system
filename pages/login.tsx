'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const isAuthenticated = Boolean(localStorage.getItem('userToken'));
    if (isAuthenticated) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = () => {
    if (username && password) {
      localStorage.setItem('userToken', 'demoToken');
      localStorage.setItem('username', username);
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E3F2FD] text-[#1565C0] px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <input
          type="text"
          placeholder="Username"
          className="mb-4 px-4 py-2 rounded bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-6 px-4 py-2 rounded bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-[#26A69A] hover:bg-[#2196F3] transition duration-200 px-6 py-2 rounded text-white font-semibold w-full"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
