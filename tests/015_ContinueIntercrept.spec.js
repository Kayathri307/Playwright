import { test, expect } from '@playwright/test';

test('@QW Security test - unauthorized order access', async ({ page }) => {

  // Login
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('anshika@gmail.com');
  await page.locator('#userPassword').fill('Iamking@000');
  await page.locator("[value='Login']").click();

  await page.waitForLoadState('networkidle');
  await page.locator('.card-body b').first().waitFor();

  // Navigate to Orders
  await page.locator("button[routerlink*='myorders']").click();

  // ✅ Correct request interception
  await page.route(
    '**/api/ecom/order/get-orders-details?id=*',
    async route => {
      const request = route.request();

      await route.continue({
        url: `https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6`
      });
    }
  );

  // Trigger intercepted request
  await page.locator("button:has-text('View')").first().click();

  // Assertion
  await expect(page.locator('p').last())
    .toHaveText('You are not authorize to view this order');
});