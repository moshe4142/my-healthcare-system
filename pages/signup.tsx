"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = users.some((u: { email: string }) => u.email === email);

    if (userExists) {
      alert("User already exists");
      return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("userToken", "fakeToken");
    localStorage.setItem("profile", JSON.stringify(newUser));
    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e0f7fa] to-white p-4 text-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
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
            onClick={handleSignup}
            className="w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700"
          >
            Sign Up
          </button>
        </div>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-700 underline hover:text-blue-900"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
