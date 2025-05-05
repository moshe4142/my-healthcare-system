'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/login');
    } else {
      const profileData = localStorage.getItem('profileData');
      if (profileData) {
        setProfile(JSON.parse(profileData));
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    router.push('/login');
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-[#E3F2FD] to-white text-[#0D47A1]">
      <div className="max-w-2xl mx-auto bg-white/80 p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">👤 Profile</h1>
        <ul className="space-y-2">
          {Object.entries(profile).map(([key, value]) => (
            <li key={key}>
              <strong className="capitalize">{key}:</strong> {value || 'Not set'}
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
