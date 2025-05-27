import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    id,
    full_name,
    date_of_birth,
    phone,
    email,
    address,
    password,
  } = req.body;

  if (!id || !full_name || !date_of_birth || !phone || !email || !address || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users (id, full_name, date_of_birth, phone, email, address, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, full_name, email, date_of_birth, phone, address 
    `,
      [id, full_name, date_of_birth, phone, email, address, hashedPassword]
    );

    const user = result.rows[0];

    // יצירת JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    // שליחת העוגייה
    res.setHeader(
      'Set-Cookie',
      serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      })
    );

    return res.status(201).json({ user });
  } catch (error: any) {
    console.error('DB insert error:', error);
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email or ID already exists' });
    }
    return res.status(500).json({ error: 'Failed to create user' });
  }
}
