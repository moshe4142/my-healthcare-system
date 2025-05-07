"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profile, setProfile] = useState<{ email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const storedProfile = localStorage.getItem("profile");

    if (!token || !storedProfile) {
      router.push("/login");
      return;
    }

    setProfile(JSON.parse(storedProfile));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("profile");
    router.push("/login");
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#e0f7fa] to-white p-4 text-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome</h1>
        <p className="mb-6">Logged in as: <strong>{profile.email}</strong></p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white p-3 rounded-xl hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
