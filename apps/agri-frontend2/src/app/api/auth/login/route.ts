// 登入 /api/auth/login

import { NextResponse } from 'next/server';
import { prisma } from '../../utils/prisma';
import { comparePassword, signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

const POST = async (request: Request) => {
  try {
    const { account, password } = await request.json();
    if (!account || !password) {
      return NextResponse.json({ message: '缺少帳號或密碼' }, { status: 400 });
    }

    const user = await prisma.users.findUnique({
      where: { email: account },
      // include: { orders: true },
    });

    if (!user)
      return NextResponse.json({ message: '帳號或密碼錯誤' }, { status: 401 });

    const ok = await comparePassword(password, user.password);
    if (!ok)
      return NextResponse.json({ message: '帳號或密碼錯誤' }, { status: 401 });

    const token = signToken({ uid: user.id, role: user.role });
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      // secure: true, // 部署 HTTPS 後打開
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token,
      // order: user.orders,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: '登入失敗',
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
};

export { POST };
