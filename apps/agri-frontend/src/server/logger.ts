
// 錯誤
export function logError(tag: string, error: unknown) {
  const time = new Date().toISOString();
  console.error(`[${time}] [${tag}]`, error);
}

// 資訊
export function logInfo(tag: string, message: string, data?: any) {
  const time = new Date().toISOString();
  console.log(`[${time}] [${tag}] ${message}`, data || '');
}

// 低爸
export function logDebug(tag: string, message: string, data?: any) {
  if (process.env.NODE_ENV === 'development') {
    const time = new Date().toISOString();
    console.debug(`[${time}] [${tag}] ${message}`, data || '');
  }
}