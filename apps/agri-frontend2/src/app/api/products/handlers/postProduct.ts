import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../utils/prisma';

const postProduct = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        mainImage: data.mainImage,
        detailImages: data.detailImages,
        productTypes: {
          create: data.productTypes,
        },
      },
      include: {
        productTypes: true,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to create product, ${err}` },
      { status: 500 },
    );
  }
};

export { postProduct };
