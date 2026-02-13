import { test, expect } from '@playwright/test';

test('Visual Testing - DemoQA Home', async ({ page }) => {

  await page.goto('https://demoqa.com/', { waitUntil: 'networkidle' });

  // Full page screenshot
  await expect(page).toHaveScreenshot('demoqa-home.png');

  // Logo screenshot
  const logo = page.locator('header img');
  await expect(logo).toHaveScreenshot('demoqa-logo.png');
});