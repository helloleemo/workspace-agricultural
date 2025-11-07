import { NextResponse } from 'next/server';
import { prisma } from '@/app/api/utils/prisma';
import { getAuth, requireRole, hashPassword } from '@/lib/auth';
import { Prisma } from '@prisma/client';

export async function GET(req: Request) {
  const auth = await getAuth();
  try {
    requireRole(auth, ['SUPERUSER']);
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message },
      { status: e.status ?? 403 },
    );
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';
  // const page = Number(searchParams.get('page') ?? '1');
  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: Prisma.QueryMode.insensitive } },
          { email: { contains: q, mode: Prisma.QueryMode.insensitive } },
          { phone: { contains: q, mode: Prisma.QueryMode.insensitive } },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    prisma.users.findMany({
      where,
      // skip: (page - 1) * pageSize,
      // take: pageSize,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        orders: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.users.count({ where }),
  ]);

  return NextResponse.json({ items, total });
}
