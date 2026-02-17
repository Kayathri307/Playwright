// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 40 * 1000,
  },

  // reporter: 'html',
   reporter: [
    ['html'],
    ['allure-playwright'],
  ],

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace:'on',
  }
});
