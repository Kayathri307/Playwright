import { expect } from "@playwright/test";
export class CartPage{
    constructor(page){
        this.page= page;
        this.cartItems= page.locator("div li");
        this.productTitle= page.locator("h3:has-text('ZARA COAT 3')")
        this.checkoutButton= page.locator("text=Checkout");

  
    }
    async validateCartItems(){
        await this.cartItems.first().waitFor();
        const bool = await this.productTitle.isVisible();
      //  expect(bool).toBeTruthy();
    }
 async clickCheckout(){
    await this.checkoutButton.click();
 }
}