import { prisma } from '@/server/db';
import { handleApi } from '@/server/handler';
import { logInfo } from '@/server/logger';

export const GET = () =>
  handleApi('GET /api/products', async () => {
    logInfo('GET /api/products', 'Fetching all products');
    
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    logInfo('GET /api/products', `Found ${products.length} products`);
    return products;
  });

export const POST = (req: Request) =>
  handleApi('POST /api/products', async () => {
    logInfo('POST /api/products', 'Creating new product');
    
    const body = await req.json();
    
    // 驗證必要欄位
    if (!body?.name || typeof body.name !== 'string' || body.name.trim() === '') {
      throw new Error('validation: Product name is required');
    }
    
    if (typeof body.price !== 'number' || body.price <= 0) {
      throw new Error('validation: Product price must be a positive number');
    }
    
    const product = await prisma.product.create({
      data: {
        name: body.name.trim(),
        price: body.price,
      },
    });
    
    logInfo('POST /api/products', `Created product with id: ${product.id}`, { 
      name: product.name, 
      price: product.price 
    });
    
    return Response.json(product, { status: 201 });
  });