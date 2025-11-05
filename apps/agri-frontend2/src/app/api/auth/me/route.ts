import { NextResponse } from 'next/server';
import { prisma } from '../../utils/prisma';
import { getTokenFromRequest, verifyToken } from '../../utils/auth';

export async function GET() {
  try {
    const token = await getTokenFromRequest();
    if (!token) return NextResponse.json({ user: null }, { status: 200 });

    const payload = verifyToken(token);
    const user = await prisma.users.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch {
    // token 失效就當未登入
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
