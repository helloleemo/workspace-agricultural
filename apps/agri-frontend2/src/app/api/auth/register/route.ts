import { hashPassword } from '@/lib/auth';
import { prisma } from '../../utils/prisma';
import { createErrorResponse, createSuccessResponse } from '@/lib/handler';

// 註冊 /api/auth/register
const POST = async (request: Request) => {
  try {
    const { name, email, phone, password, role } = await request.json();
    if (!name || !email || !phone || !password) {
      return createErrorResponse('缺少必要欄位', 400);
    }

    const hashed = await hashPassword(password);
    const user = await prisma.users.create({
      data: { name, email, phone, password: hashed, role: role ?? 'USER' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });
    return createSuccessResponse(user, 201, '註冊成功');
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'P2002') {
      return createErrorResponse('Email 或 Phone 已被使用', 409);
    }
    return createErrorResponse('Server Error', 500);
  }
};

export { POST };
