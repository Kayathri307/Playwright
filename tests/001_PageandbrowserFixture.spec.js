// 'const' is used to declare a constant variable.
// { test } is imported from '@playwright/test' — this gives access to the 
// Playwright 'test' function.
// 'require' is used to import modules from other files or packages.
// Here, we are importing the 'test' function from the '@playwright/test' module.
const { test } = require('@playwright/test');

// 'test' defines a test case: (test name, async function with test steps).
// why async Browser actions take time.
// await makes Playwright wait for each step.
// Without async/await, steps run early and tests fail.
// Async = smooth, step-by-step execution.
// Fixtures are passed as arguments to the test function{} .
//Fixtures = Pre-built helpers that give you what you need in a test (like the page, browser, or context).
//playwright creates the browser → opens a new page → gives it to your test
// 'page' is a built-in fixture that provides methods to interact with a web page.
// Playwright automatically creates and closes the browser, context, and page for each test.
test('open main page and check title', async ({ page }) => {
await page.goto('https://google.com');
console.log(await page.title());

});

// 'browser' is also a built-in fixture.
// It represents the entire browser instance.
// We can use it to create new contexts or pages manually.
//we can add cookie or other setup before creating a new page.
//Fixtures like page and browser are auto-provided by Playwright.
//page = single tab (used for most UI tests).
//browser = full browser instance (used for multiple contexts or custom setup).
test('check login functionality', async  ({browser} ) => {
  
  const context = await browser.newContext();//“Browser = The full Chrome app.”
  const page = await context.newPage();//Page = A tab in the Incognito window
  await page.goto('https://google.com');
  console.log(await page.title());
  expect(page).toHaveTitle('Google');
  

  // test steps go here
});

// Browser = main Chrome/Firefox/WebKit instance.
// Context = isolated, incognito-like browser session.
// Page = a tab inside the context where your test runs.


test('check login functionalities', async ({ page }) => {

  await test.step('Navigate to Google', async () => {
    await page.goto('https://google.com');
  });

  await test.step('Verify page title', async () => {
    await expect(page).toHaveTitle('Google');
  });

});
