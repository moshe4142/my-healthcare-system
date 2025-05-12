'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = async () => {
  setError('');
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Login failed');
      return;
    }

    // Temporarily store user (or whatever you want)
    localStorage.setItem('userToken', 'fakeToken');
    localStorage.setItem('profileData', JSON.stringify(data.user));
    router.push('/');
  } catch (err) {
    setError('Login failed. Please try again.');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b2ebf2] to-white p-4 text-gray-900">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">🔐 Login</h1>
        <div className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition"
          >
            Login
          </button>
        </div>
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-blue-700 underline hover:text-blue-900">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
