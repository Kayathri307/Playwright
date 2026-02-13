import { test, expect } from "@playwright/test";

test("Dynamic Table Handling - CPU using %", async ({ page }) => {

  await page.goto("https://practice.expandtesting.com/dynamic-table");

  const browserName = "Chrome";

  // Locate table body
  const tableBody = page.locator(".table tbody");
  await expect(tableBody).toBeVisible();

  // Get all rows
  const rows = tableBody.locator("tr");
  const rowCount = await rows.count();

  for (let i = 0; i < rowCount; i++) {

    const row = rows.nth(i);
    const rowText = await row.innerText();

    // Step 1: identify correct row
    if (rowText.includes(browserName)) {

      // Step 2: find CPU cell using %
      const cpuValue = await row.locator("td:has-text('%')").innerText();

      console.log(`CPU value for ${browserName}: ${cpuValue}`);
      break;
    }
  }
});
 