import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../utils/prisma';

const putProduct = async (req: NextRequest, id: string) => {
  try {
    const data = await req.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        mainImage: data.mainImage,
        detailImages: data.detailImages,
      },
      include: { productTypes: true },
    });

    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to update product, ${err}` },
      { status: 500 },
    );
  }
};

export { putProduct };
