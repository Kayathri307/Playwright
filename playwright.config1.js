// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  //retries:1,
  retries: process.env.CI ? 2 :0,


  timeout: 30 * 1000,

  expect: {
    timeout: 40 * 1000,
  },


//  reporter: 'html',
 // playwright.config.js

  reporter: [
    ['html'],
    ['allure-playwright'],
  ],


 workers: 2,
projects: [
  {
    name: 'webkit',
    use: {
      browserName: 'webkit',   // Safari = WebKit
      headless: false,
      screenshot: 'only-on-failure',
      trace: 'on',
      video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],

    },
  },
  {
    name: 'Chromium',
    use: {
      browserName: 'chromium',
      headless: false,
      screenshot: 'only-on-failure',
      trace: 'on',
      ignoreHTTPSErrors: true,
      permissions: ['geolocation'],
    },
  },
],

  
});
