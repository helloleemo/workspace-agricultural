import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

/**
 * 統一的錯誤回應格式
 */
export interface ErrorResponse {
  success: false;
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * 統一的成功回應格式
 */
export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

/**
 * 建立錯誤回應
 */
export function createErrorResponse(
  message: string,
  status = 400,
  code?: string,
  details?: unknown,
) {
  return NextResponse.json<ErrorResponse>(
    {
      success: false,
      message,
      ...(code && { code }),
      ...(typeof details === 'object' && details !== null
        ? { details }
        : details !== undefined
        ? { details }
        : {}),
    },
    { status },
  );
}

/**
 * 建立成功回應
 */
export function createSuccessResponse<T>(
  data: T,
  status = 200,
  message?: string,
) {
  return NextResponse.json<SuccessResponse<T>>(
    {
      success: true,
      data,
      ...(message && { message }),
    },
    { status },
  );
}

/**
 * 處理 Zod 驗證錯誤
 */
export function handleZodError(error: ZodError) {
  return createErrorResponse(
    '資料驗證失敗',
    400,
    'VALIDATION_ERROR',
    error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    })),
  );
}

/**
 * 處理 Prisma 錯誤
 */
export function handlePrismaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return createErrorResponse(
          '資料已存在，請勿重複建立',
          409,
          'DUPLICATE_ERROR',
        );
      case 'P2025':
        return createErrorResponse('找不到指定的資料', 404, 'NOT_FOUND');
      case 'P2003':
        return createErrorResponse('關聯資料不存在', 400, 'FOREIGN_KEY_ERROR');
      default:
        return createErrorResponse(
          '資料庫操作失敗',
          500,
          'DATABASE_ERROR',
          error.code,
        );
    }
  }

  return createErrorResponse('資料庫錯誤', 500, 'DATABASE_ERROR');
}

/**
 * 統一的錯誤處理器
 */
export function handleApiError(error: unknown) {
  console.error('API Error:', error);

  // Zod 驗證錯誤
  if (error instanceof ZodError) {
    return handleZodError(error);
  }

  // Prisma 錯誤
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error);
  }

  // 一般錯誤
  if (error instanceof Error) {
    return createErrorResponse(
      error.message || '伺服器錯誤',
      500,
      'INTERNAL_ERROR',
    );
  }

  // 未知錯誤
  return createErrorResponse('發生未知錯誤', 500, 'UNKNOWN_ERROR');
}

/**
 * 常用的錯誤回應
 */
export const CommonErrors = {
  unauthorized: () =>
    createErrorResponse('未授權，請先登入', 401, 'UNAUTHORIZED'),
  forbidden: () => createErrorResponse('權限不足', 403, 'FORBIDDEN'),
  notFound: (resource = '資源') =>
    createErrorResponse(`${resource}不存在`, 404, 'NOT_FOUND'),
  badRequest: (message = '請求參數錯誤') =>
    createErrorResponse(message, 400, 'BAD_REQUEST'),
  internal: (message = '伺服器內部錯誤') =>
    createErrorResponse(message, 500, 'INTERNAL_ERROR'),
};
