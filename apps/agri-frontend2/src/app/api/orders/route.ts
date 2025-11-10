// /app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/api/utils/prisma';
import { getAuthFromRequest, requireAuth, requireRole } from '@/lib/auth';
import { createOrderInput } from '@/lib/zod/order';
import { createErrorResponse } from '@/lib/handler';

/**
 * GET /api/orders
 * - SUPERUSER：可查全部
 * - USER：只允許查自己的（ token.uid）
 */
export async function GET(req: NextRequest) {
  try {
    // 驗證身分
    const auth = requireAuth(req);
    if (!auth) return createErrorResponse('未授權', 401);

    const { searchParams } = new URL(req.url);
    const q = searchParams.get('search') ?? '';
    const page = Number(searchParams.get('page') ?? '1');
    const pageSize = Number(searchParams.get('pageSize') ?? '100');

    let where = q
      ? {
          OR: [
            { customerName: { contains: q, mode: 'insensitive' } },
            { customerEmail: { contains: q, mode: 'insensitive' } },
            { customerPhone: { contains: q, mode: 'insensitive' } },
          ],
        }
      : {};
    console.log('auth.role:', auth.role);
    // 只有 SUPERUSER 可以查全部，USER 只能查自己的
    if (auth.role !== 'SUPERUSER') {
      if (q) {
        where = {
          AND: [{ userId: auth.uid }, where],
        };
      } else {
        where = { userId: auth.uid };
      }
    }

    const [rows, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          orderItems: true,
          coupon: true,
          user: { select: { id: true, email: true } },
        },
        // orderBy: { createdAt: 'desc' },
        // skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({ ok: true, page, pageSize, total, rows });
  } catch (err) {
    const status = (err as any)?.status || 400;
    return errorJson((err as Error).message || '查詢失敗', status);
  }
}

/**
 * POST /api/orders
 * - 需要登入
 * - payload 驗證（createOrderInput）
 * - 交易建立訂單與明細
 */
export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req); // 會丟 401
    const json = await req.json();
    const data = createOrderInput.parse(json);

    // 金額以「分」計
    const totalAmount = data.items.reduce(
      (sum, it) => sum + it.price * it.quantity,
      0,
    );

    const order = await prisma.$transaction(async (tx) => {
      return tx.order.create({
        data: {
          userId: user.uid,
          couponId: data.couponId ?? null,
          deliverType: data.deliverType,
          paymentType: data.paymentType,
          status: 'created',
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          totalPrice: totalAmount,
          orderItems: {
            create: data.items.map((it) => ({
              productTypeId: it.productTypeId,
              quantity: it.quantity,
              price: it.price,
            })),
          },
        },
        include: {
          orderItems: true,
          coupon: true,
          user: {
            select: { id: true, name: true, phone: true, email: true },
          },
        },
      });
    });

    return NextResponse.json({ ok: true, order }, { status: 201 });
  } catch (err: any) {
    const status = err?.status || (err instanceof Response ? err.status : 400);
    if (err instanceof Response) return err;
    return errorJson(err?.message ?? '建立失敗', status);
  }
}
