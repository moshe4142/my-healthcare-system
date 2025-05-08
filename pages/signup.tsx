'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    full_name: '',
    date_of_birth: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      router.push('/profile');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (formData.id && formData.password) {
      localStorage.setItem('userToken', 'demoToken');
      localStorage.setItem('id', formData.id);
      localStorage.setItem('profileData', JSON.stringify(formData));
      router.push('/profile');
    }
  };

  const autoCompleteMap: { [key: string]: string } = {
    password: 'new-password',
    full_name: 'name',
    date_of_birth: 'bday',
    id: 'off',
    phone: 'tel',
    email: 'email',
    address: 'street-address'
  };

  const fieldOrder = [
    'email',
    'password',
    'full_name',
    'date_of_birth',
    'id',
    'phone',
    'address'
  ];

  const placeholders: { [key: string]: string } = {
    id: '🆔 ID',
    email: '📧 Email Address',
    password: '🔒 Password',
    full_name: '🧑 Full Name',
    date_of_birth: '🎂 Date of Birth',
    phone: '📱 Phone Number',
    address: '🏠 Address'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E3F2FD] to-white text-[#0D47A1]">
      <div className="max-w-md w-full p-8 bg-white/70 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">📝 Sign Up</h1>

        {fieldOrder.map((field) => (
          <input
            key={field}
            name={field}
            autoComplete={autoCompleteMap[field] || 'off'}
            type={
              field === 'password'
                ? 'password'
                : field === 'date_of_birth'
                ? 'date'
                : 'text'
            }
            placeholder={placeholders[field] || field}
            className="mb-4 px-4 py-2 rounded-xl bg-[#F5F5F5] text-black border border-[#BDBDBD] w-full focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
            value={(formData as any)[field]}
            onChange={handleChange}
          />
        ))}

        <button
          onClick={handleSignup}
          className="bg-[#26A69A] hover:bg-[#2196F3] transition px-6 py-2 rounded-xl text-white font-semibold w-full"
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
