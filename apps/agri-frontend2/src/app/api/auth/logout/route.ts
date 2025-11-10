import { NextRequest, NextResponse } from 'next/server';
import { TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/lib/auth';
import { createSuccessResponse } from '@/lib/handler';

export async function POST(req: NextRequest) {
  const response = createSuccessResponse(req, 200, '登出成功');

  // 清除 Access Token
  response.cookies.set(TOKEN_NAME, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  // 清除 Refresh Token
  response.cookies.set(REFRESH_TOKEN_NAME, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return response;
}
