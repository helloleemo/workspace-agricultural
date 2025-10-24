import { prisma } from '@/server/db';

type Ctx = { params: { id: string } };

export async function GET(_: Request, { params }: Ctx) {
  const id = Number(params.id);
  const data = await prisma.product.findUnique({ where: { id } });
  if (!data) return new Response('Not Found', { status: 404 });
  return Response.json(data);
}

export async function PATCH(req: Request, { params }: Ctx) {
  const id = Number(params.id);
  const patch = await req.json();
  const data = await prisma.product.update({
    where: { id },
    data: patch,
  });
  return Response.json(data);
}

export async function DELETE(_: Request, { params }: Ctx) {
  const id = Number(params.id);
  await prisma.product.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
