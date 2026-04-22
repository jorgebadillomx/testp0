import { request } from '@playwright/test';

export async function resetTestData() {
  const apiContext = await request.newContext({ baseURL: 'http://127.0.0.1:3001' });
  await apiContext.post('/api/test/reset');
  await apiContext.dispose();
}
