import { NextResponse } from 'next/server';
import { prisma } from '../utils/prisma';

export const getProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { productTypes: true },
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
};
