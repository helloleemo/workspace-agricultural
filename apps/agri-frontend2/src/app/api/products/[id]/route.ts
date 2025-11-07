import { NextResponse } from 'next/server';
import { prisma } from '../../utils/prisma';
import { productUpdateSchema } from '../schema';

// 取得單一產品
// GET /api/products/:id

const GET = async (_request: Request, context: any) => {
  const params = await context.params;
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { productTypes: true },
  });
  return product
    ? NextResponse.json(product)
    : NextResponse.json({ message: 'Not Found' }, { status: 404 });
};

// 修改產品
// PUT /api/products/:id
const PUT = async (request: Request, context: any) => {
  try {
    const params = await context.params;
    const json = await request.json();
    const data = productUpdateSchema.parse(json);

    const prismaData = {
      ...data,
      productTypes: data.productTypes
        ? {
            deleteMany: {},
            create: data.productTypes,
          }
        : undefined,
    };

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: prismaData,
      include: { productTypes: true },
    });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to update product', error: (err as Error).message },
      { status: 400 },
    );
  }
};

export { GET, PUT };
