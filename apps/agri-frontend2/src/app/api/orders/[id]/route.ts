import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/api/utils/prisma';
import { requireAuth } from '@/lib/auth';

type Params = { params: { id: string } };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const user = requireAuth(req);
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        orderItems: true,
        coupon: true,
        user: { select: { id: true, email: true } },
      },
    });
    if (!order)
      return NextResponse.json(
        { ok: false, message: 'Not found' },
        { status: 404 },
      );

    if (user.role !== 'SUPERUSER' && order.userId !== user.id) {
      return NextResponse.json(
        { ok: false, message: 'Forbidden' },
        { status: 403 },
      );
    }

    return NextResponse.json({ ok: true, order });
  } catch (err: any) {
    if (err instanceof Response) return err;
    return NextResponse.json(
      { ok: false, message: err.message ?? 'Get failed' },
      { status: 400 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const user = requireAuth(req);
    const order = await prisma.order.findUnique({ where: { id: params.id } });
    if (!order)
      return NextResponse.json(
        { ok: false, message: 'Not found' },
        { status: 404 },
      );

    // 只能取消自己的訂單；SUPERUSER 可強制取消
    if (user.role !== 'SUPERUSER' && order.userId !== user.id) {
      return NextResponse.json(
        { ok: false, message: 'Forbidden' },
        { status: 403 },
      );
    }

    // 僅允許 created/pending 可取消（可依你的業務調整）
    if (!['created', 'pending'].includes(order.status as any)) {
      return NextResponse.json(
        { ok: false, message: 'Order can’t be cancelled at this status' },
        { status: 409 },
      );
    }

    const updated = await prisma.order.update({
      where: { id: params.id },
      data: { status: 'cancelled' },
    });

    return NextResponse.json({ ok: true, order: updated });
  } catch (err: any) {
    if (err instanceof Response) return err;
    return NextResponse.json(
      { ok: false, message: err.message ?? 'Cancel failed' },
      { status: 400 },
    );
  }
}
