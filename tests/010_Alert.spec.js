import{test,expect} from "@playwright/test";

test("Hidden Element Handling",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
      await page.locator("#alertbtn").click();
      page.on('dialog',async dialog=>{
        console.log(dialog.message());
        expect(dialog.message()).toEqual("Hello , share this practice page and share your knowledge");
        await dialog.accept();
      });               
});