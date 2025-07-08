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
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: "Invalid appointment id" });
  }

  if (req.method === 'PUT') {
    const { doctor_id, appointment_date, status, notes } = req.body;

    if (!doctor_id || !appointment_date || !status) {
      return res.status(400).json({ error: 'Missing required fields: doctor_id, appointment_date, status' });
    }

    try {
      // Optional: ודא שהתור שייך למשתמש הזה (patient_id = userId)
      const existingRes = await pool.query(
        'SELECT * FROM appointments WHERE id = $1 AND patient_id = $2',
        [id, userId]
      );

      if (existingRes.rowCount === 0) {
        return res.status(404).json({ error: "Appointment not found or unauthorized" });
      }

      const updateRes = await pool.query(
        `UPDATE appointments
         SET doctor_id = $1,
             appointment_date = $2,
             status = $3,
             notes = $4
         WHERE id = $5
         RETURNING *`,
        [doctor_id, appointment_date, status, notes || null, id]
      );

      return res.status(200).json({ appointment: updateRes.rows[0] });
    } catch (error) {
      console.error('Update appointment error:', error);
      return res.status(500).json({ error: 'Failed to update appointment' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      // Optional: בדיקה שהמשתמש הוא בעל התור
      const existingRes = await pool.query(
        'SELECT * FROM appointments WHERE id = $1 AND patient_id = $2',
        [id, userId]
      );

      if (existingRes.rowCount === 0) {
        return res.status(404).json({ error: "Appointment not found or unauthorized" });
      }

      await pool.query('DELETE FROM appointments WHERE id = $1', [id]);

      return res.status(200).json({ message: "Appointment deleted" });
    } catch (error) {
      console.error('Delete appointment error:', error);
      return res.status(500).json({ error: 'Failed to delete appointment' });
    }
  }

  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
