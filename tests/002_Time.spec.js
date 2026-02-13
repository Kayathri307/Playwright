// playwright.config.js → Main configuration file

// testDir → Folder path where all tests run
// testDir: './tests',

// Default test timeout = 30 seconds
// Increase timeout for entire project:
// timeout: 40 * 1000   // 40 seconds per test

// Assertion timeout (for expect())
// expect: { timeout: 5000 }   // Playwright waits 5 seconds for expect() to pass
//run npx playwright test --headed to see the browser UI

const{ test } = require('@playwright/test');
test('check time functions', async({page})=>{
  await page.goto('https://google.com');

});

