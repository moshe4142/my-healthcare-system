import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    delete user.password;

    // יצירת JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // ודא שיש user.role
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    console.error("Login DB error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
