"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    // אם יש טוקן, הפנה את המשתמש לפרופיל
    if (token) {
      router.push("/profile");
    }
  }, [router]);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: { email: string; password: string }) =>
        u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("userToken", "fakeToken"); // שמירת הטוקן ב־localStorage
      localStorage.setItem("profile", JSON.stringify(user)); // שמירת הפרופיל ב־localStorage
      router.push("/profile"); // הפניה לפרופיל לאחר התחברות
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e0f7fa] to-white p-4 text-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
          >
            Login
          </button>
        </div>
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-700 underline hover:text-blue-900"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
