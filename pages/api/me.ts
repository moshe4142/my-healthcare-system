import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookies = req.headers.cookie;
    if (!cookies) return res.status(401).json({ error: 'No token' });

    const { token } = parse(cookies);
    if (!token) return res.status(401).json({ error: 'No token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.id]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ error: 'User not found' });

    delete user.password;
    res.status(200).json(user);
  } catch (err) {
    console.error('Me route error:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
