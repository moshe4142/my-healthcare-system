// /pages/api/updateUser/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    full_name,
    date_of_birth,
    phone,
    email,
    address,
    image_url,
  } = req.body;

  try {
    await pool.query(
      `UPDATE users
       SET full_name = $1,
           date_of_birth = $2,
           phone = $3,
           email = $4,
           address = $5,
           image_url = $6
       WHERE id = $7`,
      [full_name, date_of_birth, phone, email, address, image_url, id]
    );

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Database update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
