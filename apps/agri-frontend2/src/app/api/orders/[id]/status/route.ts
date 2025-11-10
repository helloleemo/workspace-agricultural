import { prisma } from '@/app/api/utils/prisma';
import { requireAuth, requireRole } from '@/lib/auth';
import {
  createErrorResponse,
  createSuccessResponse,
  handleApiError,
} from '@/lib/handler';
import { NextRequest } from 'next/server';

//
const PATCH = async (
  request: NextRequest,
  context: { params: { id: string } },
) => {
  try {
    // 驗證身分
    const auth = requireAuth(request);
    requireRole(auth, ['SUPERUSER']);
    // 驗證內容
    const params = context.params;
    const orderId = params.id;
    if (!orderId) {
      return createErrorResponse('缺少訂單 ID', 400);
    }

    const json = await request.json();
    const status = json.status;
    if (!status) {
      return createErrorResponse('缺少狀態', 400);
    }

    // 更新訂單狀態
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    return createSuccessResponse(null, 200, '更新訂單狀態成功');
  } catch (err) {
    return handleApiError(err);
  }
};
