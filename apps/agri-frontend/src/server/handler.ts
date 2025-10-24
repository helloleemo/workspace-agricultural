export async function handleApi(fn: () => Promise<Response>) {
  try {
    return await fn();
  } catch (err) {
    console.error('[API ERROR]', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
