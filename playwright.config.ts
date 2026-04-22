import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry'
  },
  webServer: [
    {
      command: 'npm --prefix app/backend run start',
      port: 3001,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000
    },
    {
      command: 'npm --prefix app/frontend run dev -- --host 127.0.0.1 --port 5173',
      port: 5173,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000
    }
  ]
});
