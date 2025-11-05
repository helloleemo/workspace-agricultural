import { NextResponse } from 'next/server';
import { prisma } from '../../utils/prisma';

const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Product deleted' });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to delete product, ${err}` },
      { status: 500 },
    );
  }
};

export { deleteProduct };
