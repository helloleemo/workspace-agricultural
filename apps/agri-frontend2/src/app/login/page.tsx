'use client';
import { useState } from 'react';

export default function TestAuthPage() {
  const [output, setOutput] = useState<any>(null);

  const register = async () => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Roy',
          email: 'roy@example.com',
          phone: '0912345678',
          password: 'test123456',
        }),
      });
      const data = await res.json();
      setOutput({ action: 'register', status: res.status, data });
    } catch (err) {
      setOutput({ action: 'register', error: String(err) });
    }
  };

  const login = async () => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          account: 'roy@example.com', // 可改成電話登入
          password: 'test123456',
        }),
      });
      const data = await res.json();
      setOutput({ action: 'login', status: res.status, data });
    } catch (err) {
      setOutput({ action: 'login', error: String(err) });
    }
  };

  const getMe = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include', // 確保 cookie 帶上
      });
      const data = await res.json();
      setOutput({ action: 'me', status: res.status, data });
    } catch (err) {
      setOutput({ action: 'me', error: String(err) });
    }
  };

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      setOutput({ action: 'logout', status: res.status, data });
    } catch (err) {
      setOutput({ action: 'logout', error: String(err) });
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">🔐 Auth API 測試頁面</h1>
      <div className="space-x-3">
        <button
          onClick={register}
          className="rounded-md bg-green-500 px-4 py-2 text-white"
        >
          註冊
        </button>
        <button
          onClick={login}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          登入
        </button>
        <button
          onClick={getMe}
          className="rounded-md bg-yellow-500 px-4 py-2 text-black"
        >
          取得使用者
        </button>
        <button
          onClick={logout}
          className="rounded-md bg-red-500 px-4 py-2 text-white"
        >
          登出
        </button>
      </div>

      <div className="mt-6 rounded-md bg-gray-100 p-4">
        <h2 className="mb-2 font-semibold">結果：</h2>
        <pre className="text-sm whitespace-pre-wrap">
          {output ? JSON.stringify(output, null, 2) : '（尚未執行）'}
        </pre>
      </div>
    </div>
  );
}
