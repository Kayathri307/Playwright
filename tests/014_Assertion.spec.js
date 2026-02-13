
import { test, expect } from "@playwright/test";

test('Assertions Demo', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');

  await page.locator('input[name="q"]').fill('iphone 13 pro');

  const suggestions = page.locator('ul li');

  //  Immediate check (NO wait)
  const isNowVisible = await suggestions.first().isVisible();
  console.log('isVisible:', isNowVisible);

  // ✅ Assertion with auto-wait
  await expect(suggestions.first()).toBeVisible();
    const isAfterVisible = await suggestions.first().isVisible();
  console.log('isVisible:', isAfterVisible);

});


