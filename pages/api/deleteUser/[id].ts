import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db'; // או prisma אם אתה משתמש בו

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userId = parseInt(id as string);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // כאן מאפסים את העוגיה של הטוקן
    res.setHeader('Set-Cookie', `token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax; Secure`);

    return res.status(200).json({ message: 'User deleted successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
