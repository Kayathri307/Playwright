// @ts-check
const { defineConfig } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 40 * 1000,
  },

  // ✅ Reports
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  // ✅ CI-safe retries & workers
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  // ✅ Single use block
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});
