// 前端 API 請求範例
async function apiRequest(url: string, options?: RequestInit) {
  let response = await fetch(url, options);

  // 如果 401，嘗試 refresh token
  if (response.status === 401) {
    const refreshResponse = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshResponse.ok) {
      // Refresh 成功，重試原本的請求
      response = await fetch(url, options);
    } else {
      // Refresh 失敗，導向登入頁
      window.location.href = '/login';
    }
  }

  return response;
}

export { apiRequest };
