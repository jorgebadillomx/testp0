import { test, expect } from '@playwright/test';
import { resetTestData } from '../utils';

test.beforeEach(async () => {
  await resetTestData();
});

// test('crea una cotización válida', async ({ request }) => {
//TODO
//   });

  // Nota: este test refleja el comportamiento actual, aunque no sea REST-correcto.
  // await expect(response).toBeOK();
  // expect(response.status()).toBe(200);

  // const body = await response.json();
  // expect(body.customerName).toBe('Ana López');
  // expect(body.productId).toBe(1);
});

// test('regresa error cuando falta customerName', async ({ request }) => {
//TODO
//   });

  // expect(response.status()).toBe(400);
});
