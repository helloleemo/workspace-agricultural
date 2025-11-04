import { prisma } from '@/server/db';
import { handleApi } from '@/server/handler';
import { logInfo } from '@/server/logger';

export const GET = () =>
  handleApi('GET /api/products', async () => {
    logInfo('GET /api/products', 'Fetching all products');

    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    logInfo('GET /api/products', `Found ${products.length} products`);
    return products;
  });

export const POST = (req: Request) =>
  handleApi('POST /api/products', async () => {
    logInfo('POST /api/products', 'Creating new product');

    const body = await req.json();

    // 驗證必要欄位
    if (
      !body?.name ||
      typeof body.name !== 'string' ||
      body.name.trim() === ''
    ) {
      throw new Error('validation: Product name is required');
    }
    if (
      !body?.description ||
      typeof body.description !== 'string' ||
      body.description.trim() === ''
    ) {
      throw new Error('validation: Product description is required');
    }
    if (
      !body?.mainImage ||
      typeof body.mainImage !== 'string' ||
      body.mainImage.trim() === ''
    ) {
      throw new Error('validation: Product mainImage is required');
    }
    if (
      !Array.isArray(body.detailImages) ||
      body.detailImages.length === 0 ||
      !body.detailImages.every(
        (img: any) => typeof img === 'string' && img.trim() !== ''
      )
    ) {
      throw new Error(
        'validation: Product detailImages must be a non-empty string array'
      );
    }

    const product = await prisma.product.create({
      data: {
        name: body.name.trim(),
        description: body.description.trim(),
        mainImage: body.mainImage.trim(),
        detailImages: body.detailImages,
      },
    });

    logInfo('POST /api/products', `Created product with id: ${product.id}`, {
      name: product.name,
    });

    return Response.json(product, { status: 201 });
  });
