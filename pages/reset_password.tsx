"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      if (typeof token === "string") {
        setToken(token);
      } else {
        setError("Invalid token");
      }
    }
  }, [router.isReady, router.query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("Please fill out both fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setMessage("Password updated successfully!");
        setTimeout(() => router.push("/login"), 2500);
      }
    } catch (err) {
      console.error("Reset error:", err);
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b2ebf2] to-white p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
          🔒 Set New Password
        </h1>

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
          placeholder="🔑 New password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-xl w-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
        />

        <input
          type="password"
          placeholder="🔁 Confirm password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-4 py-2 rounded-xl w-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-6"
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition disabled:opacity-50"
          disabled={!password || !confirmPassword || loading}
        >
          {loading ? "Saving..." : "Save New Password"}
        </button>
      </form>
    </div>
  );
}
