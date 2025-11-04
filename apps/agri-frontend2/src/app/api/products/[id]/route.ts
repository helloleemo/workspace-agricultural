import { NextRequest } from 'next/server';
import { getProduct } from '../handlers/getProduct';
import { putProduct } from '../handlers/putProduct';
import { deleteProduct } from '../handlers/deleteProduct';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return getProduct(params.id);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return putProduct(req, params.id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return deleteProduct(params.id);
}
