const { test, expect } = require('@playwright/test');
 let webcontext
 test.beforeAll(async ({browser})=>
{ 

    const context = await browser.newContext();
    
    const  page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("kayaui@gmail.com");
   await page.locator("#userPassword").fill("Test@1234");

   await page.locator("#login").click();
   await page.waitForLoadState('networkidle');
   await context.storageState({ path: 'state.json' });
  webcontext = await browser.newContext({storageState:'state.json'});
 })
 

 
test('@Webst Client App login', async () => {
   //js file- Login js, DashboardPage
   const email = "kayaui@gmail.com";
   const productName = 'ZARA COAT 3';
  
   

   const page = await webcontext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
 
  await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

   //Grab order id from orders page and assert it with order id in order details page
   const orderPage= await page.locator("button[routerlink*='myorders']").click();

   expect(await page.locator("h1:has-text('Your Orders')")).toBeTruthy();
   const trimmedOrderId= orderId.split(" ")[2].trim();
   console.log(trimmedOrderId);
   await page.locator("tbody tr").first().waitFor();
   const orderRows= page.locator("tbody tr");
   console.log( 'Total order rows: '+ await orderRows.count());
   for(let i=0;i< await orderRows.count();++i)
    {
      const orderRowText= (await orderRows.nth(i).locator("th").textContent()).trim();
       console.log(orderRowText);
      if(orderRowText===trimmedOrderId)
        {
       const viewbutton = await orderRows.nth(i).locator("td .btn-primary");
         await viewbutton.isVisible();
         
         await viewbutton.click();
         break;
      } 
    }
    await expect(page.locator(".col-text")).toHaveText(trimmedOrderId);
    expect(orderId.includes( await page.locator(".col-text").textContent())).toBeTruthy();
 
});
 test('@Test2 Client App login', async () => {
   //js file- Login js, DashboardPage
   const email = "kayaui@gmail.com";
   const productName = 'ZARA COAT 3';
  
   

   const page = await webcontext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); });
 