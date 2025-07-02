'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTheme } from "../context/ThemeContext"; // ודא שהנתיב נכון

export default function SignUpPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
  const [signupError, setSignupError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const autoCompleteMap: { [key: string]: string } = {
    password: 'new-password',
    full_name: 'name',
    date_of_birth: 'bday',
    id: 'off',
    phone: 'tel',
    email: 'email',
    address: 'street-address',
  };

  const fieldOrder: Array<keyof typeof formData> = [
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
    if (name === 'id' && !/^\d{8,10}$/.test(value)) return 'Invalid ID number format.';
    if (name === 'phone' && !/^\+?\d{7,15}$/.test(value)) return 'Invalid phone number format.';
    if (name === 'email' && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Invalid email format.';
    if (name === 'password' && value.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'id' && value && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    setValidFields((prev) => ({ ...prev, [name]: errorMsg === '' }));
    setSignupError('');
  };

  const handleSignup = async () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    for (const key of Object.keys(formData)) {
      const errorMsg = validateField(key, formData[key as keyof typeof formData]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
        isValid = false;
      }
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setSignupError(`❌ ${data.error || 'Registration failed'}`);
        return;
      }

      router.push('/profile');
    } catch (err) {
      console.error(err);
      setSignupError('❌ Failed to register. Please try again later.');
    }
  };

  return (
    <div
      className={`
        min-h-screen flex items-center justify-center p-4
        transition-colors duration-500
        ${isDark
          ? 'bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-100'
          : 'bg-gradient-to-b from-[#b2ebf2] to-white text-gray-900'
        }
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
          📝 Sign Up
        </h1>

        {signupError && (
          <div className={`
            px-4 py-2 mb-4 text-center border rounded-md transition-colors
            ${isDark
              ? 'bg-red-900 text-red-200 border-red-700'
              : 'bg-red-100 text-red-700 border-red-300'}
          `}>
            {signupError}
          </div>
        )}

        {fieldOrder.map((field) => (
          <div key={field} className="relative mb-5">
            <input
              name={field}
              autoComplete={autoCompleteMap[field] || 'off'}
              type={
                field === 'password'
                  ? showPassword ? 'text' : 'password'
                  : field === 'date_of_birth'
                  ? 'date'
                  : field === 'phone'
                  ? 'tel'
                  : 'text'
              }
              placeholder={placeholders[field]}
              className={`
                px-4 py-2 pr-10 rounded-xl w-full border transition-all
                ${errors[field]
                  ? 'border-red-500'
                  : validFields[field]
                  ? 'border-green-500'
                  : isDark
                  ? 'border-gray-600'
                  : 'border-gray-300'}
                ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-900'}
                focus:outline-none focus:ring-2
                ${isDark ? 'focus:ring-blue-600' : 'focus:ring-blue-300'}
              `}
              value={formData[field]}
              onChange={handleChange}
            />
            {field === 'password' && (
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className={`absolute right-10 top-3 cursor-pointer transition-colors ${
                  isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            )}
            {errors[field] && (
              <FaTimesCircle className="absolute right-3 top-3 text-red-500" />
            )}
            {!errors[field] && validFields[field] && (
              <FaCheckCircle className="absolute right-3 top-3 text-green-500" />
            )}
            {errors[field] && (
              <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
            )}
          </div>
        ))}

        <button
          className={`
            w-full py-2 mt-4 rounded-xl transition-colors
            ${isDark
              ? 'bg-blue-700 hover:bg-blue-600 text-white'
              : 'bg-blue-700 hover:bg-blue-800 text-white'}
          `}
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className={`
              underline transition-colors
              ${isDark
                ? 'text-blue-300 hover:text-blue-100'
                : 'text-blue-700 hover:text-blue-900'}
            `}
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
