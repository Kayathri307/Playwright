import { test, expect, request } from '@playwright/test';
import { ApiUtil } from '../Util/ApiUtil.js';

const loginPayload = {
  userEmail: "kayaui@gmail.com",
  userPassword: "Test@1234"
};

const orderPayload = {
  orders: [
    { country: "Algeria", productOrderedId: "6964af52c941646b7a919472" }
  ]
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtil(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test('@API Place the order', async ({ page }) => {

  await page.addInitScript(token => {
    window.localStorage.setItem('token', token);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*='myorders']").click();

  const rows = page.locator("tbody tr");
  await rows.first().waitFor();

  for (let i = 0; i < await rows.count(); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (rowOrderId?.trim() === response.orderId) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderIdDetails?.trim()).toBe(response.orderId);
});
