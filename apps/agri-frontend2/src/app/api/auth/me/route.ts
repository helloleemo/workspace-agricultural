import { readTokenFromRequest, requireAuth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../utils/prisma';
import {
  createErrorResponse,
  createSuccessResponse,
  handleApiError,
} from '@/lib/handler';

const GET = async (req: NextRequest) => {
  try {
    const auth = readTokenFromRequest(req);
    if (!auth) {
      return createErrorResponse('未授權或 Token 無效', 401);
    }
    const user = await prisma.users.findUnique({
      where: { id: auth },
    });
    if (!user) {
      return createErrorResponse('使用者不存在', 404);
    }
    return createSuccessResponse(user, 200, '取得使用者資料成功');
  } catch (err) {
    return handleApiError(err);
  }
};

export { GET };
