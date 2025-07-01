// pages/api/appointments/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const userId = decoded.id;

    const result = await pool.query(
      "SELECT * FROM appointments WHERE patient_id = $1 ORDER BY appointment_date ASC",
      [userId]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
