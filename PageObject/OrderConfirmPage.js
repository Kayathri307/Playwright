import { expect } from "@playwright/test";
export class OrderConfirmationPage {
   constructor(page) {
      this.page = page;
   }

   async validateThankYouMessage() {
      await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   }

   async getOrderId() {
      return await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   }

   async extractTrimmedOrderId(orderId) {
      return orderId.split(" ")[2].trim();
   }

   async validateOrderId(orderId) {
      const retrievedOrderId = await this.getOrderId();
      console.log(retrievedOrderId);
      return retrievedOrderId;
   }
}