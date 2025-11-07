import { prisma } from '../utils/prisma';
import { productCreateSchema } from './schema';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

// 搜尋產品
// GET /api/products?search=...&page=1&pageSize=20

const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('search') ?? '';
  const page = Number(searchParams.get('page') ?? '1');
  const pageSize = Number(searchParams.get('pageSize') ?? '20');
  // const skip = (Math.max(page, 1) - 1) * Math.max(pageSize, 1);
  // const take = Math.max(pageSize, 1);
  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: Prisma.QueryMode.insensitive } },
          { description: { contains: q, mode: Prisma.QueryMode.insensitive } },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      // skip,
      // take,
      orderBy: { createdAt: 'desc' },
      include: { productTypes: true }, // 包含productTypes
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, pageSize });
};

// 新增產品 POST

const POST = async (req: Request) => {
  try {
    const json = await req.json();
    const data = productCreateSchema.parse(json);

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

    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return NextResponse.json(
        { message: 'Invalid payload', issues: err.issues },
        { status: 400 },
      );
    }
    console.error(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
};

export { GET, POST };
