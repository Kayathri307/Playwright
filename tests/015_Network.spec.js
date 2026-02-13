import { test, expect, request } from '@playwright/test';
import { ApiUtil } from '../Util/ApiUtil.js';

/* ------------------ Test Data ------------------ */

const loginPayLoad = {
  userEmail: 'kayaui@gmail.com',
  userPassword: 'Test@1234'
};

const orderPayload = {
  orders: [
    { country: "Algeria", productOrderedId: "6964af52c941646b7a919472" }
  ]
};

const fakePayLoadOrders = {
  data: [],
  message: 'No Orders'
};

let response;

/* ------------------ Before All ------------------ */

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtil = new ApiUtil(apiContext, loginPayLoad);

  // Create order via API
  response = await apiUtil.createOrder(orderPayload);
});

/* ------------------ Test ------------------ */

test('016 - Network Mock | No Orders', async ({ page }) => {

  // Inject token before app loads
  page.addInitScript(token => {
    window.localStorage.setItem('token', token);
  }, response.token);

  await page.goto('https://rahulshettyacademy.com/client');

  // Mock Orders API
  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    async route => {
      const originalResponse = await page.request.fetch(route.request());

      await route.fulfill({
        status: originalResponse.status(),
        headers: {
          ...originalResponse.headers(),
          'content-type': 'application/json'
        },
        body: JSON.stringify(fakePayLoadOrders)
      });
    }
  );

  // Navigate to My Orders
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

  // Assertion
  const noOrdersText = await page.locator('.mt-4').textContent();
  await page.pause();
  console.log(noOrdersText);

  expect(noOrdersText).toContain('No Orders');
});