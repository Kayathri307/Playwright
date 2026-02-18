// import { test, expect } from '@playwright/test';
import { POManager } from '../PageObject/POManager.js';
import placeOrderData from '../Util/Placeorder.json';
const dataset = placeOrderData;
import { testDatafixture } from '../Util/test-base.js';

import { test } from '../Util/test-base.js';


//import placeOrderData from '../Util/Placeorder.json' assert { type: 'json' };
//json-->stringify-->object
//const dataset = JSON.parse(JSON.stringify(placeOrderData));
for (const data of dataset)
  {

test(`Webst Client App login ${data.productName}`, async ({ page }) => {
  

  // const userName = "kayaui@gmail.com";
  // const password = "Test@1234";
  // const productName = 'ZARA COAT 3';

  const poManager = new POManager(page);

  // Login
  const loginPage = poManager.getLoginPage();
  await loginPage.gotoUrl();
  await loginPage.validateLogin(data.userName, data.password);

  // Dashboard
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductandAddToCart(data.productName);

  await dashboardPage.navigateToCart();

  // Cart
  const cartPage = poManager.getCartPage();
  await cartPage.validateCartItems();
  await cartPage.clickCheckout();

  // Order Details
  const orderDetailPage = poManager.getOrderDetailPage();
  await orderDetailPage.selectCountry("India");

  const userNameDetails = await orderDetailPage.getUserName();
  expect(userNameDetails.trim()).toBe(data.userName);

  await orderDetailPage.submitOrder();

  // Order Confirmation
  const confirmationPage = poManager.getOrderConfirmationPage();
  await confirmationPage.validateThankYouMessage();

  const orderId = await confirmationPage.validateOrderId();
  const trimmedOrderId = await confirmationPage.extractTrimmedOrderId(orderId);

  // Orders Page
  const ordersPage = poManager.getOrdersPage();
  await ordersPage.navigateToOrders();
  await ordersPage.waitForOrdersTable();

  //  Click order → Order Details page
  await ordersPage.searchAndClickOrder(orderId);

  //  Validate Order Details page
  await ordersPage.validateOrderDetailsPage(trimmedOrderId);

  //  Back to Orders list and validate presence
  await ordersPage.navigateToOrders();
  await ordersPage.waitForOrdersTable();
  await ordersPage.validateOrderInList(trimmedOrderId);
  });
}



test('Webst Client App login using fixture', async ({ page, testDatafixture }) => {

  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.gotoUrl();
  await loginPage.validateLogin(
    testDatafixture.userName,
    testDatafixture.password
  );

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductandAddToCart(
    testDatafixture.productName
  );

});

