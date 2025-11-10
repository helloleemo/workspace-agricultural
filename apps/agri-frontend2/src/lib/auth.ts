import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

export type Role = 'SUPERUSER' | 'USER';

export type JwtPayload = {
  uid: string;
  role: Role;
};

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'dev-refresh-secret';
export const TOKEN_NAME = 'token';
export const REFRESH_TOKEN_NAME = 'refreshToken';
const ACCESS_TOKEN_EXPIRES_IN = '15m'; // Access Token 短時效
const REFRESH_TOKEN_EXPIRES_IN = '7d'; // Refresh Token 長時效

/* ---------- JWT ---------- */

// 產生 Access Token (短時效)
export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

// 產生 Refresh Token (長時效)
export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
}

// 驗證 Access Token
export function verifyToken(token?: string): JwtPayload | null {
  try {
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

// 驗證 Refresh Token
export function verifyRefreshToken(token?: string): JwtPayload | null {
  try {
    if (!token) return null;
    return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * 從 NextRequest 讀取 Access Token
 */
export function readTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization') || '';
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const cookieHeader = req.headers.get('cookie') || '';
  const cookieToken =
    cookieHeader
      ?.split('; ')
      .find((c) => c.startsWith(`${TOKEN_NAME}=`))
      ?.split('=')[1] ?? null;
  return bearer || cookieToken;
}

/**
 * 從 NextRequest 讀取 Refresh Token
 */
export function readRefreshTokenFromRequest(req: NextRequest): string | null {
  const cookieHeader = req.headers.get('cookie') || '';
  const refreshToken =
    cookieHeader
      ?.split('; ')
      .find((c) => c.startsWith(`${REFRESH_TOKEN_NAME}=`))
      ?.split('=')[1] ?? null;
  return refreshToken;
}

// 取得並驗證 token，回傳 payload 或 null
export function getAuthFromRequest(req: NextRequest): JwtPayload | null {
  const token = readTokenFromRequest(req);
  return verifyToken(token || undefined);
}

/**
 * 需要登入：沒 token → 401；有 token 但無效 → 401
 * 回傳驗證過的 JwtPayload
 */
export function requireAuth(req: NextRequest): JwtPayload {
  const auth = getAuthFromRequest(req);
  if (!auth) {
    const err = new Error('Unauthorized');
    (err as any).status = 401;
    throw err;
  }
  return auth;
}

/**
 * 需要角色：不符合 → 403；未登入 → 401
 */
export function requireRole(auth: JwtPayload | null, roles: Role[]) {
  if (!auth) {
    const err = new Error('Unauthorized');
    (err as any).status = 401;
    throw err;
  }
  if (!roles.includes(auth.role)) {
    const err = new Error('Forbidden');
    (err as any).status = 403;
    throw err;
  }
}

/* ---------- Password ---------- */

export async function hashPassword(plain: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain: string, hashed: string) {
  return bcrypt.compare(plain, hashed);
}
