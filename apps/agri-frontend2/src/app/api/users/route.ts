import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/api/utils/prisma';
import { requireAuth, requireRole } from '@/lib/auth';
import { Prisma } from '@prisma/client';
import { createErrorResponse, createSuccessResponse } from '@/lib/handler';

const GET = async (req: NextRequest) => {
  try {
    // 驗證身分
    const auth = requireAuth(req);
    requireRole(auth, ['SUPERUSER']);

    const { searchParams } = new URL(req.url);
    const q = searchParams.get('search') ?? '';
    // const page = Number(searchParams.get('page') ?? '1');
    // const pageSize = Number(searchParams.get('pageSize') ?? '100');
    // const skip = (Math.max(page, 1) - 1) * Math.max(pageSize, 1);
    // const take = Math.max(pageSize, 1);

    const where = q
      ? {
          OR: [
            { name: { contains: q, mode: Prisma.QueryMode.insensitive } },
            { email: { contains: q, mode: Prisma.QueryMode.insensitive } },
            { phone: { contains: q, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
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

    return createSuccessResponse({ users, total }, 200, '取得使用者列表成功');
  } catch (err: unknown) {
    return createErrorResponse((err as Error).message, 500);
  }
};

export { GET };
