import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';

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
    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (id, full_name, date_of_birth, phone, email, address, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, full_name, email, date_of_birth, phone, address 
    `;
    const values = [id, full_name, date_of_birth, phone, email, address, hashedPassword];

    const result = await pool.query(query, values);

    return res.status(201).json({ user: result.rows[0] });
  } catch (error: any) {
    console.error('DB insert error:', error);
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email or ID already exists' });
    }
    return res.status(500).json({ error: 'Failed to create user' });
  }
}
