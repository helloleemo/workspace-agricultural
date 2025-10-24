import { handleApi } from '@/server/handler';
import { logInfo } from '@/server/logger';

// 測試用
export const GET = () =>
  handleApi('GET /api/hello', async () => {
    logInfo('GET /api/hello', 'Hello API called');
    
    return {
      message: 'Hello from Agricultural API!',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    };
  });