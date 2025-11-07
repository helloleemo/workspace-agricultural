import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies, headers } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'; // 記得改環境變數
const TOKEN_NAME = 'token';
const EXPIRES_IN = '7d';

export type Role = 'SUPERUSER' | 'USER';

export type JwtPayload = { uid: string; role: Role };

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token?: string): JwtPayload | null {
  try {
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export async function getAuth() {
  const h = await headers();
  const authHeader = h.get('authorization') || '';
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(TOKEN_NAME)?.value;
  const token = bearer || cookieToken;
  return verifyToken(token);
}

export function requireRole(auth: JwtPayload | null, roles: Role[]) {
  if (!auth || !roles.includes(auth.role)) {
    const err = new Error('Forbidden');
    (err as any).status = auth ? 403 : 401;
    throw err;
  }
}

export async function hashPassword(plain: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain: string, hashed: string) {
  return bcrypt.compare(plain, hashed);
}
