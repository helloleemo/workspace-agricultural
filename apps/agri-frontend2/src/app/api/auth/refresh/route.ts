import { NextRequest } from 'next/server';
import {
  readRefreshTokenFromRequest,
  verifyRefreshToken,
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

async function POST(req: NextRequest) {
  try {
    // 從 Cookie 讀取 Refresh Token
    const refreshToken = readRefreshTokenFromRequest(req);
    if (!refreshToken) return createErrorResponse('找不到Refresh token', 401);

    // 驗證 Refresh Token
    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      return createErrorResponse('無效的 Refresh token', 401);
    }

    // 產生新的 Access Token 和 Refresh Token
    const newAccessToken = signToken({ uid: payload.uid, role: payload.role });
    const newRefreshToken = signRefreshToken({
      uid: payload.uid,
      role: payload.role,
    });

    const response = createSuccessResponse(
      { uid: payload.uid, role: payload.role },
      200,
      'Token 刷新成功',
    );

    // 設定新的 Access Token
    response.cookies.set(TOKEN_NAME, newAccessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 15, // 15 分鐘
    });

    // 設定新的 Refresh Token
    response.cookies.set(REFRESH_TOKEN_NAME, newRefreshToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 天
    });

    return response;
  } catch (err) {
    handleApiError(err);
  }
}

export { POST };
