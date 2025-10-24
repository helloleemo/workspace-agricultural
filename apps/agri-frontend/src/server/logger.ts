export function logError(tag: string, error: unknown) {
  const time = new Date().toISOString();
  console.error(`[${time}] [${tag}]`, error);
}