import { test, expect } from '@playwright/test';

test('Child Window', async ({ browser }) => {
  const content = await browser.newContext();
  const page = await content.newPage();

  await page.goto('https://demo.automationtesting.in/I ndex.html');
  await page.locator('#email').fill('abc@gmail.com');
  await page.locator('#enterimg').click();
  // Hover on SwitchTo
  await page.locator('text=SwitchTo').hover();

  // Click Windows submenu
  await page.locator("//*[@class='dropdown-menu']//li/a[text()='Windows']").click();

  // Assertion
  await expect(page).toHaveURL(/Windows.html/);
  await page.locator('#Tabbed a .btn-info').click();

});
test("Autocomplete suggestions", async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/');

  const search = page.locator('#small-searchterms');
  await search.pressSequentially('boo', { delay: 150 });
  const suggestions = page.locator('.ui-autocomplete li');

  await expect(suggestions.first()).toBeVisible();

});

test("Autocomplete suggestion", async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  const search = page.locator('.RjvT8t .lNPl8b');
  //Fill
  await search.fill('book shelf');
  await page.waitForTimeout(2000);
  await search.fill(' ');
  //press sequentially
  await search.pressSequentially('book shelf with Wooden', { delay: 200 });
  const suggestions = page.locator("ul li");
  await expect(suggestions.first()).toBeVisible();

});

test("UI Handling ", async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  const loginlocator = page.locator(".pStjB2  a[title='Login']");
  const search = page.locator('.RjvT8t .lNPl8b');
  await loginlocator.hover();//mousse hover
  await page.waitForTimeout(2000);
  await search.hover();//to remove that hover effect
  await search.fill('book shelf');
  await page.waitForTimeout(2000);
  await loginlocator.click();//click after hover
  await page.waitForTimeout(2000);
});


test("Screenshots", async ({ page }) => {
await page.goto('https://www.flipkart.com/');
const searchBox = page.locator('input[name="q"]');
await searchBox.fill('bookshelf wooden');
const suggestions = page.locator('ul li');
await expect(suggestions.first()).toBeVisible();

  // Page screenshot
  await page.screenshot({ path: 'page.png' });

  // Element screenshot (BEST PRACTICE)
  await searchBox.screenshot({ path: 'search-box.png' });

});

test.only("Api response", async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  page.on('request',  r=>console.log('Request: ' + r.url()));
  page.on('response',  r=>console.log('Response: ' + r.url(), r.status()));
  
    
});