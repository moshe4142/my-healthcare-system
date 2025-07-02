"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;

  const theme = useTheme();
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
    <div
      className="min-h-screen flex items-center justify-center p-4 text-gray-900 dark:text-gray-100 transition-all duration-300"
      style={{
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(to bottom, #e0f7fa, #ffffff)"
            : "linear-gradient(to bottom, #121212, #1e1e1e)",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-md bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-center mb-6 tracking-tight">
          🔐 Set New Password
        </h1>

        {error && (
          <div className="bg-red-100 dark:bg-red-800/80 text-red-800 dark:text-red-100 p-3 rounded-lg mb-4 border border-red-300 dark:border-red-600 font-medium">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-100 dark:bg-green-800/80 text-green-800 dark:text-green-100 p-3 rounded-lg mb-4 border border-green-300 dark:border-green-600 font-medium">
            {message}
          </div>
        )}

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 border-2 rounded-lg mb-3 bg-white dark:bg-[#1e1e1e] dark:border-gray-700 border-gray-300 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 border-2 rounded-lg mb-5 bg-white dark:bg-[#1e1e1e] dark:border-gray-700 border-gray-300 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          value={confirmed}
          onChange={(e) => setConfirmed(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full font-semibold text-lg bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 shadow-md"
        >
          Set Password
        </button>
      </div>
    </div>
  );
}
