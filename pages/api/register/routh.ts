import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    full_name,
    date_of_birth,
    phone,
    email,
    address,
    password,
  } = req.body;

  try {
    const query = `
      INSERT INTO patients (full_name, date_of_birth, phone, email, address, password)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, full_name, email
    `;
    const values = [full_name, date_of_birth, phone, email,  address, password];

    const result = await pool.query(query, values);
    return res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error('DB insert error:', error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
}