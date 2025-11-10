import { createSuccessResponse, handleApiError } from '@/lib/handler';
import { prisma } from '../utils/prisma';
import { productCreateSchema } from '@/lib/zod/product';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import { requireAuth, requireRole } from '@/lib/auth';

// 搜尋產品
// GET /api/products?search=...&page=1&pageSize=20

const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('search') ?? '';
    const page = Number(searchParams.get('page') ?? '1');
    const pageSize = Number(searchParams.get('pageSize') ?? '100');
    // const skip = (Math.max(page, 1) - 1) * Math.max(pageSize, 1);
    // const take = Math.max(pageSize, 1);
    const where = q
      ? {
          OR: [
            { name: { contains: q, mode: Prisma.QueryMode.insensitive } },
            {
              description: {
                contains: q,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        // skip,
        // take,
        orderBy: { createdAt: 'desc' },
        include: { productTypes: true },
      }),
      prisma.product.count({ where }),
    ]);
    return createSuccessResponse({ items, total, page, pageSize });
  } catch (error) {
    return handleApiError(error);
  }
};

// 新增產品 POST

const POST = async (req: NextRequest) => {
  try {
    // 驗證身分
    const auth = requireAuth(req);
    requireRole(auth, ['SUPERUSER']);

    // 驗證內容
    const json = await req.json();
    const data = productCreateSchema.parse(json);

    // 建立產品
    const created = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        mainImage: data.mainImage ?? '',
        detailImages: data.detailImages ?? [],
        productTypes: {
          create: data.productTypes.map((pt) => ({
            type: pt.type,
            price: pt.price,
            stock: pt.stock,
          })),
        },
      },
      include: { productTypes: true },
    });

    return createSuccessResponse(created, 201, '產品建立成功');
  } catch (err: unknown) {
    return handleApiError(err);
  }
};

export { GET, POST };
