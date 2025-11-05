import { NextResponse } from 'next/server';
import { prisma } from '../../utils/prisma';

const getProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
};

export { getProducts };
