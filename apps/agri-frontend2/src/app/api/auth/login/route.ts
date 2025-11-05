import { NextResponse } from 'next/server';
import { prisma } from '../../utils/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { setAuthCookie, signToken } from '../../utils/auth';

const LoginSchema = z.object({
  account: z.string().min(3), // 可用 email 或 phone
  password: z.string().min(8),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { account, password } = LoginSchema.parse(json);

    const user = await prisma.users.findFirst({
      where: {
        OR: [{ email: account }, { phone: account }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const token = signToken({ userId: user.id });
    setAuthCookie(token);

    // 不回傳密碼
    const { password: _pw, ...safe } = user;
    return NextResponse.json({ user: safe }, { status: 200 });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json(
        { error: 'Validation failed', details: err.issues },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
