import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // תחליף לפי איך אתה מתחבר ל־Neon
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const token = randomUUID();
  const expiry = new Date(Date.now() + 1000 * 60 * 60); // שעה קדימה

  await db.user.update({
    where: { email },
    data: { reset_token: token, reset_token_expiry: expiry }
  });

  console.log(`Reset link: http://localhost:3000/reset-password/${token}`);

  return NextResponse.json({ message: 'Reset link sent (check console)' });
}

