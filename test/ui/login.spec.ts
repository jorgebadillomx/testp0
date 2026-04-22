import { test, expect } from '@playwright/test';
import { resetTestData } from '../utils';

test.beforeEach(async () => {
  await resetTestData();
});

test('permite login exitoso', async ({ page }) => {
  await page.goto('/');

//TODO

  // Bug de calidad intencional: espera fija poco robusta.
  //await page.waitForTimeout(5000);

  //await expect(page.getByText('Nueva cotización')).toBeVisible();
});
