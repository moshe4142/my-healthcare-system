// This file handles appointment-related API requests, including fetching and creating appointments.
// api/appointments/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) return res.status(401).json({ error: "Missing token" });

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const userId = decoded.id;

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        "SELECT * FROM appointments WHERE patient_id = $1 ORDER BY appointment_date ASC",
        [userId]
      );
      return res.status(200).json({ appointments: result.rows });
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === 'POST') {
    const { patient_id, doctor_id, appointment_date, status, notes } = req.body;

    if (!patient_id || !doctor_id || !appointment_date) {
      return res.status(400).json({ error: 'Missing required fields: patient_id, doctor_id, appointment_date' });
    }

    try {
      const result = await pool.query(
        `
        INSERT INTO appointments (patient_id, doctor_id, appointment_date, status, notes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [patient_id, doctor_id, appointment_date, status || 'pending', notes || null]
      );

      return res.status(201).json({ appointment: result.rows[0] });
    } catch (error) {
      console.error('Create appointment error:', error);
      return res.status(500).json({ error: 'Failed to create appointment' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}