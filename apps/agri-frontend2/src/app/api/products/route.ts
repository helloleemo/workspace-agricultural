import { NextRequest } from 'next/server';
import { getProducts } from './handlers/getProducts';
import { postProduct } from './handlers/postProduct';

export async function GET() {
  return getProducts();
}

export async function POST(req: NextRequest) {
  return postProduct(req);
}
