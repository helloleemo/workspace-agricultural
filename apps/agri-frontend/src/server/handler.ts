
import { logError } from '@/server/logger';

export async function handleApi<T>(
  tag: string,
  fn: () => Promise<T>
): Promise<Response> {
  try {
    const result = await fn();
    
    // 如果結果已經是 Response 物件，直接返回
    if (result instanceof Response) {
      return result;
    }
    
    // 否則包裝成 JSON Response
    return Response.json(result);
  } catch (err) {
    logError(tag, err);
    
    // 檢查是否是已知的錯誤類型
    if (err instanceof Error) {
      if (err.message.includes('not found') || err.message.includes('P2025')) {
        return new Response('Not Found', { status: 404 });
      }
      if (err.message.includes('validation') || err.message.includes('invalid')) {
        return new Response('Bad Request', { status: 400 });
      }
    }
    
    return new Response('Internal Server Error', { status: 500 });
  }
}
