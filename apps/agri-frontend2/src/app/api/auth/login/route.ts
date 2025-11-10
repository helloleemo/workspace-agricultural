import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../utils/prisma';
import {
  comparePassword,
  signToken,
  signRefreshToken,
  TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from '@/lib/auth';
import {
  createErrorResponse,
  createSuccessResponse,
  handleApiError,
} from '@/lib/handler';
import { loginInput } from '@/lib/zod/login';

// 登入
const POST = async (req: NextRequest) => {
  try {
    const json = await req.json();
    const data = loginInput.parse(json);

    const user = await prisma.users.findUnique({
      where: {
        email: data.account,
      },
    });

    if (!user) {
      return createErrorResponse('帳號或密碼錯誤', 401, 'INVALID_CREDENTIALS');
    }

    const ok = await comparePassword(data.password, user.password);
    if (!ok) {
      return createErrorResponse('帳號或密碼錯誤', 401, 'INVALID_CREDENTIALS');
    }

    // 產生 Access Token 和 Refresh Token
    const accessToken = signToken({ uid: user.id, role: user.role });
    const refreshToken = signRefreshToken({ uid: user.id, role: user.role });

    const response = createSuccessResponse(user, 200, '登入成功');

    // 設定 Access Token Cookie (短時效)
    response.cookies.set(TOKEN_NAME, accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 15, // 15 分鐘
    });

    // 設定 Refresh Token Cookie (長時效)
    response.cookies.set(REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 天
    });

    return response;
  } catch (err: unknown) {
    return handleApiError(err);
  }
};

export { POST };
