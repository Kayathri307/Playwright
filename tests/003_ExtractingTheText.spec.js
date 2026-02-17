const {test,expect} =require('@playwright/test');

test('Enter the username and password',async({page})=>{
    const username= page.locator('#username');
    const signin =page.locator('#signInBtn');
    const products= page.locator(".card-body a");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.locator('#username').fill('rahulshe');
    await page.locator("[type='password']").fill('learning');
    //await page.locator('#terms').check();
     await signin.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await username.fill("");
    await username.fill('rahulshettyacademy');
    await signin.click();
    
    //await page.locator(".card-body a").first().textContent().then(console.log);
    //await page.locator(".card-body a").nth(1).textContent().then(console.log);
    // textContent()
// - Works on ONE element
// - Auto-waits for that specific element to be ATTACHED to the DOM
// - If UI re-renders, Playwright re-locates that element
// - Stable and reliable for single text reads

// allTextContents()
// - Works on MULTIPLE elements
// - Only waits for the LOCATOR to exist (not each element)
// - Takes a snapshot of whatever elements exist at that moment
// - Fast but not guaranteed stable if the UI is re-rendering
//means if we try with textContent() and allTextContents() it will show (all the product names) only if the UI is stable
//because textContent() waits for the specific element to be attached to the DOM
//allTextContents() takes a snapshot of whatever elements exist at that moment 
//and retrun all th e product names but without  textcontent() it may not show 
// all the product names it will return empty array because the UI is not loaded completely
//playwright auto wait will check only for the locator to exist not each element


// textContent() is used for one element and it waits up to
//  30 seconds for the element to appear.
// allTextContents() is used for multiple elements, 
// but it does NOT wait — it reads only what is already on the page.
// One element + waiting → textContent()
// Multiple elements + no waiting → allTextContents()
console.log(await page.locator("[style*='block']").textContent());
await products.first().waitFor();
//await products.waitforloadstate("networkidle");
     const alltitle=await products.allTextContents();
     console.log(alltitle);
    
});

test("InnerText vs TextContent",async({page})=>{
    await page.goto("https://www.flipkart.com/");
    
    
    const electronicsTab = page.getByText('Electronics', { exact: true });
    await electronicsTab.hover();
    await page.locator((".QAl8n6")).first().waitFor();
    page.locator(".QAl8n6").filter({hasText:"Home Theatres"}).first().click();
// innerText:
// - Returns ONLY the visible text (what the user sees)
// - Ignores hidden text (display:none, visibility:hidden)
// - Does NOT auto-wait for the text to become visible
// - Works only if the element already exists in the DOM
// textContent:
// - Returns ALL text inside the element (including hidden text)
// - Auto-waits (up to 30s) for the element to be attached to the DOM
// - Does NOT depend on CSS visibility or layout
    const innerText= await page.locator(".QAl8n6").first().innerText();
    console.log("InnerText",innerText);
    const textContent= await page.locator(".QAl8n6").first().textContent();
    console.log("\n textContent \n",textContent ,"\n");


             
}
);

test.only("Two Element with same Name",async({page})=>{
    await page.goto("https://www.flipkart.com/");
    //Fail
    //  await page.locator("//*[text()='Login']").click();
    // await page.getByText('Login').first().click();
    await page.getByRole('link', { name: 'Login' }).first().click();

    // await page.getByRole('link', { name: 'Login', exact: true }).click();
// I prefer role-based or attribute-based locators to uniquely identify elements.
// I first use accessibility roles like button or link.
// If multiple elements share the same role and name, I refine the locator using stable attributes such as data-testid, class, aria attributes, or parent context.
// Only if that’s not possible, I use first() or nth() as a last option, and I avoid XPath indexing

//1) Use first() / last() (Allowed & Readable)
//await page.getByText('Login').first().click();
//2) Use nth() (Allowed & Readable)
//await page.getByText('Login').nth(0).click();
//3) Use locators which are more specific (Allowed & Readable)
//await page.locator("div[class*='login']").click();
//4) Use locator with xpath (Not Recommended & Not Readable)
// await page.locator("//*[text()='Login'][1]").click();
//5) Use getByRole with position (Allowed & Readable)
//await page.getByRole('link', { name: 'Login' }).nth(0).click();

             
}
);
