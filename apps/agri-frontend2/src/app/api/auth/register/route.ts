import { hashPassword } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { prisma } from '../../utils/prisma';

// 註冊 /api/auth/register
const POST = async (request: Request) => {
  try {
    const { name, email, phone, password, role } = await request.json();
    if (!name || !email || !phone || !password) {
      return NextResponse.json({ message: '缺少必要欄位' }, { status: 400 });
    }

    const hashed = await hashPassword(password);
    const user = await prisma.users.create({
      data: { name, email, phone, password: hashed, role: role ?? 'USER' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    if (err.code === 'P2002') {
      return NextResponse.json(
        { message: 'Email 或 Phone 已被使用' },
        { status: 409 },
      );
    }
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
};

export { POST };
