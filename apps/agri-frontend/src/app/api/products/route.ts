import { prisma } from '@/server/db';
import { handleApi } from '@/server/handler';

export const GET = () =>
  handleApi(async () => {
    const list = await prisma.product.findMany();
    return Response.json(list);
  });


export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.name || typeof body.price !== 'number') {
      return new Response('Missing name or price', { status: 400 });
    }

    const created = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
      },
    });

    return Response.json(created, { status: 201 });
  } catch (err) {
    console.error('[API ERROR][POST /api/products]', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
