import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  const user = await db.user.findFirst({
    where: {
      reset_token: token,
      reset_token_expiry: { gt: new Date() }
    }
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      reset_token: null,
      reset_token_expiry: null
    }
  });

  return NextResponse.json({ message: 'Password reset successfully' });
}
