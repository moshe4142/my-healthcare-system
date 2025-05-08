'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    full_name: '',
    date_of_birth: '',
    phone: '',
    email: '',
    address: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [validFields, setValidFields] = useState<{ [key: string]: boolean }>({});
  const [signupError, setSignupError] = useState(''); // ✅ הודעת שגיאה כללית

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      router.push('/profile');
    }
  }, [router]);

  const autoCompleteMap: { [key: string]: string } = {
    password: 'new-password',
    full_name: 'name',
    date_of_birth: 'bday',
    id: 'off',
    phone: 'tel',
    email: 'email',
    address: 'street-address',
  };

  const fieldOrder = [
    'email',
    'password',
    'full_name',
    'date_of_birth',
    'id',
    'phone',
    'address',
  ];

  const placeholders: { [key: string]: string } = {
    id: '🆔 ID Number',
    email: '📧 Email',
    password: '🔒 Password',
    full_name: '🧑 Full Name',
    date_of_birth: '🎂 Date of Birth',
    phone: '📱 Phone',
    address: '🏠 Address',
  };

  const validateField = (name: string, value: string) => {
    if (!value.trim()) return `${placeholders[name] || name} is required.`;
    if (name === 'id' && !/^\d{5,10}$/.test(value)) return 'Invalid ID number format.';
    if (name === 'phone' && !/^\d{9,10}$/.test(value)) return 'Invalid phone number format.';
    if (name === 'email' && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Invalid email format.';
    if (name === 'password' && value.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (['id', 'phone'].includes(name) && value && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    setValidFields((prev) => ({ ...prev, [name]: errorMsg === '' }));
    setSignupError(''); // לנקות שגיאה כללית בעת שינוי
  };

  const handleSignup = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    for (const key of Object.keys(formData)) {
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
        isValid = false;
      }
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(
      (u: any) => u.email === formData.email || u.id === formData.id
    );

    if (existingUser) {
      setSignupError('❌ A user with this email or ID already exists.');
      return;
    }

    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('userToken', 'demoToken');
    localStorage.setItem('profileData', JSON.stringify(formData));
    router.push('/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b2ebf2] to-white text-gray-900 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">📝 Sign Up</h1>

        {signupError && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-md px-4 py-2 mb-4 text-center">
            {signupError}
          </div>
        )}

        {fieldOrder.map((field) => (
          <div key={field} className="relative mb-5">
            <input
              name={field}
              autoComplete={autoCompleteMap[field] || 'off'}
              type={field === 'password' ? 'password' : field === 'date_of_birth' ? 'date' : 'text'}
              placeholder={placeholders[field]}
              className={`px-4 py-2 pr-10 rounded-xl w-full border ${
                errors[field]
                  ? 'border-red-500'
                  : validFields[field]
                  ? 'border-green-500'
                  : 'border-gray-300'
              } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300`}
              value={formData[field]}
              onChange={handleChange}
            />
            {errors[field] && <FaTimesCircle className="absolute right-3 top-3 text-red-500" />}
            {!errors[field] && validFields[field] && (
              <FaCheckCircle className="absolute right-3 top-3 text-green-500" />
            )}
            {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
          </div>
        ))}

        <button
          className="w-full py-2 mt-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
          onClick={handleSignup}
        >
          Sign Up
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
