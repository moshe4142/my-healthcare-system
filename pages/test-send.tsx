"use client";
import { useState } from "react";

export default function TestSend() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendTest = async () => {
    setMsg("Sending...");
    const res = await fetch("/api/request-password-reset", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMsg(data.message || data.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">📨 Send Test Email</h1>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={sendTest}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Send Reset Email
        </button>
        {msg && <p className="mt-4 text-center">{msg}</p>}
      </div>
    </div>
  );
}
