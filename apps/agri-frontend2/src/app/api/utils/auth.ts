import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'auth_token';
const MAX_AGE = 60 * 60 * 24 * 7; // 7天

export function signToken(payload: object) {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign(payload, secret, { expiresIn: MAX_AGE });
}

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET!;
  return jwt.verify(token, secret) as {
    userId: string;
    iat: number;
    exp: number;
  };
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE,
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
  });
}

export async function getTokenFromRequest() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}
