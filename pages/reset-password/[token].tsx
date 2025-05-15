"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setMessage("");
    setError("");

    if (!password || password !== confirmed) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setMessage("Password reset successful!");
    } catch (err) {
      setError("Request failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#b2ebf2] to-white text-gray-900">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">🔐 Set New Password</h1>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded mb-5"
          value={confirmed}
          onChange={(e) => setConfirmed(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
        >
          Set Password
        </button>
      </div>
    </div>
  );
}
