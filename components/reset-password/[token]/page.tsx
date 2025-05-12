'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function NewPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { token } = useParams();

  const handleSubmit = () => {
    setMessage('');
    setError('');

    if (!password || !confirm) {
      setError('אנא מלא את כל השדות.');
      return;
    }

    if (password !== confirm) {
      setError('הסיסמאות לא תואמות.');
      return;
    }

    // הדמיית איפוס סיסמה
    setTimeout(() => {
      setMessage('הסיסמה אופסה בהצלחה!');
      setTimeout(() => router.push('/login'), 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b2ebf2] to-white text-gray-900 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-900">🔐 סיסמה חדשה</h1>

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
          type="password"
          placeholder="🔑 סיסמה חדשה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 mb-4 w-full rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="password"
          placeholder="🔁 אישור סיסמה"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="px-4 py-2 mb-5 w-full rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
        >
          איפוס סיסמה
        </button>
      </div>
    </div>
  );
}
