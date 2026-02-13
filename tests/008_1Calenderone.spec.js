import { test, expect } from "@playwright/test";

test("Calendar Handling - Simple Dynamic Validation", async ({ page }) => {

  // Change date here only
  const year = "2025";
  const monthIndex = 7; // August (0-based: Jan=0, Aug=7)
  const day = "15";

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

  // Open calendar
  await page.locator(".react-date-picker__inputGroup").click();

  // Go to year selection
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();

  // Select year
  await page.getByText(year, { exact: true }).click();

  // Select month
  await page.locator(".react-calendar__year-view__months__month").nth(monthIndex).click();

  // Select day
  await page.locator(`//abbr[text()='${day}']`).click();

  // Read actual value from date input
  const actualDate = await page.locator("input[type='date']").inputValue();

  // Build expected date dynamically (YYYY-MM-DD)
  //padstart Make the string at least 2 characters long
  // If it’s shorter, add "0" at the start
  // Example: "8" -> "08"
  //monthIndex + 1 because month is 0 based
  const expectedDate =`${year}-${String(monthIndex + 1).padStart(2, "0")}-${day}`;
  

  // Assertion
  expect(actualDate).toBe(expectedDate);

  console.log("Selected Date:", actualDate);
});
