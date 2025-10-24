import { prisma } from '@/server/db';
import { handleApi } from '@/server/handler';
import { logInfo } from '@/server/logger';

interface RouteParams {
  params: { id: string };
}

export const GET = (req: Request, { params }: RouteParams) =>
  handleApi('GET /api/products/[id]', async () => {
    const id = parseInt(params.id);
    
    if (isNaN(id) || id <= 0) {
      throw new Error('validation: Invalid product ID');
    }
    
    logInfo('GET /api/products/[id]', `Fetching product with id: ${id}`);
    
    const product = await prisma.product.findUnique({
      where: { id },
    });
    
    if (!product) {
      throw new Error('not found: Product not found');
    }
    
    logInfo('GET /api/products/[id]', `Found product: ${product.name}`);
    return product;
  });

export const PUT = (req: Request, { params }: RouteParams) =>
  handleApi('PUT /api/products/[id]', async () => {
    const id = parseInt(params.id);
    
    if (isNaN(id) || id <= 0) {
      throw new Error('validation: Invalid product ID');
    }
    
    logInfo('PUT /api/products/[id]', `Updating product with id: ${id}`);
    
    const body = await req.json();
    const updateData: { name?: string; price?: number } = {};
    
    // 驗證並準備更新資料
    if (body.name !== undefined) {
      if (typeof body.name !== 'string' || body.name.trim() === '') {
        throw new Error('validation: Product name must be a non-empty string');
      }
      updateData.name = body.name.trim();
    }
    
    if (body.price !== undefined) {
      if (typeof body.price !== 'number' || body.price <= 0) {
        throw new Error('validation: Product price must be a positive number');
      }
      updateData.price = body.price;
    }
    
    // 檢查是否有要更新的欄位
    if (Object.keys(updateData).length === 0) {
      throw new Error('validation: At least one field must be provided for update');
    }
    
    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });
    
    logInfo('PUT /api/products/[id]', `Updated product: ${product.name}`, updateData);
    return product;
  });

export const DELETE = (req: Request, { params }: RouteParams) =>
  handleApi('DELETE /api/products/[id]', async () => {
    const id = parseInt(params.id);
    
    if (isNaN(id) || id <= 0) {
      throw new Error('validation: Invalid product ID');
    }
    
    logInfo('DELETE /api/products/[id]', `Deleting product with id: ${id}`);
    
    // 先檢查產品是否存在
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });
    
    if (!existingProduct) {
      throw new Error('not found: Product not found');
    }
    
    await prisma.product.delete({
      where: { id },
    });
    
    logInfo('DELETE /api/products/[id]', `Deleted product: ${existingProduct.name}`);
    
    return { 
      message: 'Product deleted successfully',
      deletedProduct: existingProduct
    };
  });