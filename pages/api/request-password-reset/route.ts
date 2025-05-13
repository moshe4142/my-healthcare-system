// app/api/request-password-reset/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // כאן אפשר להוסיף לוגיקה של שליחת מייל או שמירת טוקן למסד נתונים
  console.log('Sending reset link to:', email);

  return NextResponse.json({ message: 'Reset link sent successfully' });
}
