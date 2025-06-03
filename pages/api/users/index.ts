// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied – Admins only' });
    }

    const result = await pool.query('SELECT * FROM users');
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
