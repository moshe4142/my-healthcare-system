// pages/api/reset-password.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'Missing token or password' });
  }

  try {
    // שליפת טוקן
    const result = await pool.query(
      'SELECT user_id, expires_at FROM password_reset_tokens WHERE token = $1',
      [token]
    );

    if (result.rows.length === 0 || new Date(result.rows[0].expires_at) < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = result.rows[0].user_id;

    // עדכון סיסמה
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

    // מחיקת טוקן
    await pool.query('DELETE FROM password_reset_tokens WHERE token = $1', [token]);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Reset error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
