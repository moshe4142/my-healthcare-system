import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  console.log('Received login request');
  console.log('Email:', email);
  console.log('Password:', password);

  if (!email || !password) {
    console.warn('Missing email or password');
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    console.log('Query result:', result.rows);

    if (result.rows.length === 0) {
      console.warn('User not found for email:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];
    delete user.password; // optional for now 
    console.log('User from DB:', user);


    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.warn('Incorrect password for email:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // הסר את הסיסמה לפני שליחה ללקוח
    delete user.password;

    console.log('Login successful for:', email);
    return res.status(200).json({ message: 'Login successful', user });

  } catch (err) {
    console.error('Login DB error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
