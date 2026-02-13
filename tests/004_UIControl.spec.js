import{expect, test} from'@playwright/test';

test.describe.configure({mode:'parallel'});
//“Use describe.parallel() 
// when tests are independent and
//  don’t share data.
//Use describe.serial()
//  only when tests depend on each other
//  — like create and validate flows.




test('@smoke UI Controls  Radio Buttons and select boxes',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username= page.locator('#username');
    const password= page.locator("[type='password']");
    //dropdown select box
    const dropdown= page.locator("select.form-control");
    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    await dropdown.selectOption('Teacher');
 
  //Radio buttons
//   await page.locator("label.customradio").last().click();

    const radioButtons= page.locator("label.customradio");
    await radioButtons.last().click();
    await page.locator('#okayBtn').click();
    await expect(radioButtons.last()).toBeChecked();
    await expect(radioButtons.first()).not.toBeChecked();   

    //Checkbox
    const documentCheckBox= page.locator("#terms");
    await documentCheckBox.check();
    expect(documentCheckBox).toBeChecked();
    await documentCheckBox.uncheck();
    expect(documentCheckBox).not.toBeChecked();
    //wherever we have action we need to use await with  expect also
    expect (await documentCheckBox.isChecked()).toBeFalsy();
    //blinking text box
    const blinkingText= page.locator(".blinkingText");
    await expect(blinkingText).toHaveClass('blinkingText');
    await expect(blinkingText).toHaveAttribute('class','blinkingText');
});
//child window handling

test('Child Window handling',async({browser})=>{
    const context= await browser.newContext();
    const page= await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const doculink= page.locator("a[href*='documents-request']");
    const [newPage]= await Promise.all(  [
        context.waitForEvent('page'),
        doculink.click(),
    ]);
    console.log(await newPage.title());
    const text= await newPage.locator(".red").textContent();
    console.log(text);
    const arraytext= text.split(" ");
    const email= arraytext[4];
   // console.log(email);
    await page.locator("#username").fill(email);
    console.log(await page.locator("#username").textContent()); 
    console.log(await page.locator("#username").inputValue());
});

