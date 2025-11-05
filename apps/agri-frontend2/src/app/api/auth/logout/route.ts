import { NextResponse } from 'next/server';
import { clearAuthCookie } from '../../utils/auth';

export async function POST() {
  clearAuthCookie();
  return NextResponse.json({ ok: true }, { status: 200 });
}
