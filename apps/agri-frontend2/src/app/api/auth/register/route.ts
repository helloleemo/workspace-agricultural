import { NextResponse } from 'next/server';
import { prisma } from '../../utils/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { setAuthCookie, signToken } from '../../utils/auth';

const RegisterSchema = z.object({
  name: z.string().min(1, 'name is required'),
  email: z.string().email(),
  phone: z.string().min(5),
  password: z.string().min(8, 'password must be at least 8 chars'),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = RegisterSchema.parse(json);

    // 檢查 email/phone 是否已存在
    const exists = await prisma.users.findFirst({
      where: { OR: [{ email: data.email }, { phone: data.phone }] },
      select: { id: true, email: true, phone: true },
    });
    if (exists) {
      return NextResponse.json(
        { error: 'Email or phone already in use' },
        { status: 409 },
      );
    }

    // 雜湊密碼
    const saltRounds = 12; // 10~12 皆可
    const hash = await bcrypt.hash(data.password, saltRounds);

    const user = await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    // 發 token + 設置 HttpOnly cookie
    const token = signToken({ userId: user.id });
    setAuthCookie(token);

    return NextResponse.json({ user }, { status: 201 });
  } catch (err: any) {
    // Prisma 唯一鍵衝突
    if (err?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email or phone already in use' },
        { status: 409 },
      );
    }
    // Zod 驗證錯
    if (err?.issues) {
      return NextResponse.json(
        { error: 'Validation failed', details: err.issues },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: 'Register failed' }, { status: 500 });
  }
}
