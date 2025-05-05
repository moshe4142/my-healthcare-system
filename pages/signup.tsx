'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const isAuthenticated = Boolean(localStorage.getItem('userToken'));
    if (isAuthenticated) {
      router.push('/');
    }
  }, [router]);

  const handleSignup = () => {
    if (username && password) {
      localStorage.setItem('userToken', 'demoToken');
      localStorage.setItem('username', username);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD] to-white flex items-center justify-center px-4 text-[#0D47A1]">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">📝 Sign Up</h1>

        <input
          type="text"
          placeholder="Choose a Username"
          className="mb-4 px-4 py-2 rounded-xl bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Choose a Password"
          className="mb-6 px-4 py-2 rounded-xl bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="bg-[#26A69A] hover:bg-[#2196F3] transition duration-200 px-6 py-2 rounded-xl text-white font-semibold w-full"
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-700 underline hover:text-blue-900">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
