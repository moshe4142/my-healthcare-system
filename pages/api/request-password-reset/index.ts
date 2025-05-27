import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { sendResetEmail } from '@/lib/sendEmail';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const client = await pool.connect();

    const userResult = await client.query('SELECT id FROM users WHERE email = $1', [email]);

    if (userResult.rowCount === 0) {
      return res.status(200).json({ message: 'If the email exists, a reset link has been sent.' }); // אבטחת מידע
    }

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour from now

    await client.query(
      'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [userResult.rows[0].id, token, expiresAt]
    );

    await client.release();

    await sendResetEmail(email, token); // פונקציה שאחראית לשלוח את המייל בפועל

    return res.status(200).json({ message: 'If the email exists, a reset link has been sent.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
 