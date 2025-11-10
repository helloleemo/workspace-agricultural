import { NextRequest } from 'next/server';
import { prisma } from '../../utils/prisma';
import { productUpdateSchema } from '@/lib/zod/product';
import {
  createErrorResponse,
  createSuccessResponse,
  handleApiError,
} from '@/lib/handler';

import { requireAuth, requireRole } from '@/lib/auth';

// 取得單一產品
// GET /api/products/:id

const GET = async (
  _request: NextRequest,
  context: { params: { id: string } },
) => {
  try {
    const params = context.params;
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { productTypes: true },
    });
    if (!product) {
      return createErrorResponse('找不到產品', 404);
    }
    return createSuccessResponse(product, 200, '取得產品成功');
  } catch (err) {
    return handleApiError(err);
  }
};

// 修改產品
// PUT /api/products/:id
const PUT = async (
  request: NextRequest,
  context: { params: { id: string } },
) => {
  try {
    // 驗證身分
    const auth = requireAuth(request);
    requireRole(auth, ['SUPERUSER']);

    // 驗證內容
    const params = context.params;
    const json = await request.json();
    const data = productUpdateSchema.parse(json);

    // 分類：有 id 的更新，沒 id 的新增
    const toUpdate = (data.productTypes ?? []).filter((pt) => pt.id);
    const toCreate = (data.productTypes ?? []).filter((pt) => !pt.id);

    const prismaData = {
      ...data,
      productTypes: {
        // 更新現有 ProductType（保留原本的 id）
        update: toUpdate.map((pt) => ({
          where: { id: pt.id },
          data: {
            type: pt.type,
            price: pt.price,
            stock: pt.stock,
          },
        })),
        // 新增新的 ProductType
        create: toCreate.map((pt) => ({
          type: pt.type,
          price: pt.price,
          stock: pt.stock,
        })),
      },
    };

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: prismaData,
      include: { productTypes: true },
    });

    return createSuccessResponse(updated, 200, '產品更新成功');
  } catch (err) {
    return handleApiError(err);
  }
};

export { GET, PUT };
