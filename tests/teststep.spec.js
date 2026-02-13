const { test, expect } = require('@playwright/test');

// Test 1 – RUNS
test('check login functionality using browser fixture', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://google.com');
  await expect(page).toHaveTitle('Google');

  await context.close();
});

// Test 2 – RUNS
test('open main page and check title', async ({ page }) => {
  await page.goto('https://google.com');
  await expect(page).toHaveTitle('Google');
});

// Test 3 – RUNS
test('check login functionality with test steps', async ({ page }) => {
  await test.step('Navigate to Google', async () => {
    await page.goto('https://google.com');
  });

  await test.step('Verify page title', async () => {
    await expect(page).toHaveTitle('Google');
  });
});

// Test 4 
//skips a known broken test and marks it as FIXME in the report.
// when to use test.fixme: when a test is expected to fail due to a known issue or
//  bug that is yet to be resolved.
// why to use test.fixme: it helps in keeping the test suite clean by marking tests that are not expected to pass,
// allowing developers to focus on other tests while the known issues are being addressed.  
test.fixme('open main page and check title - fixme blocked by this defect id ite-1456', async ({ page }) => {
  await page.goto('https://google.com');
  await expect(page).toHaveTitle('Google');
});

