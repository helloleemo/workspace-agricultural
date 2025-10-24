import { prisma } from '@/server/db'; 
export async function GET() {
  const list = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return Response.json(list);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.name || typeof body.price !== 'number') {
    return new Response(JSON.stringify({ message: 'name 與 price 必填' }), { status: 400 });
  }
  const created = await prisma.product.create({
    data: { name: body.name, price: body.price },
  });
  return Response.json(created, { status: 201 });
}
