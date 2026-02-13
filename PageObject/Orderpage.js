import { expect } from '@playwright/test';

export class OrdersPage {
  constructor(page) {
    this.page = page;
    this.myOrdersButton = page.locator("button[routerlink*='myorders']");
    this.ordersTable = page.locator("tbody");
    this.orderRows = this.ordersTable.locator("tr");
    this.orderDetailsId = page.locator(".col-text").first();
  }

  async navigateToOrders() {
    await this.myOrdersButton.click();
  }

  async waitForOrdersTable() {
    await this.ordersTable.waitFor();
  }

  async searchAndClickOrder(orderId) {
    for (let i = 0; i < await this.orderRows.count(); i++) {
      const rowId = (await this.orderRows.nth(i).locator("th").textContent()).trim();
      if (orderId.includes(rowId)) {
        await this.orderRows.nth(i).locator("button").first().click();
        break;
      }
    }
  }

  async validateOrderDetailsPage(expectedOrderId) {
    await this.orderDetailsId.waitFor();
    await expect(this.orderDetailsId).toHaveText(expectedOrderId);
  }

  async validateOrderInList(trimmedOrderId) {
    for (let i = 0; i < await this.orderRows.count(); i++) {
      const rowId = (await this.orderRows.nth(i).locator("th").textContent()).trim();
      if (rowId === trimmedOrderId) {
        expect(rowId).toBe(trimmedOrderId);
        return;
      }
    }
    throw new Error(`Order ID ${trimmedOrderId} not found in Orders list`);
  }
}