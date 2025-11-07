import { getAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { prisma } from '../../utils/prisma';

const GET = async (req: Request) => {
  const auth = await getAuth();
  if (!auth)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const me = await prisma.users.findUnique({
    where: { id: auth.uid },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      orders: true,
      createdAt: true,
    },
  });

  return NextResponse.json(me);
};

export { GET };
