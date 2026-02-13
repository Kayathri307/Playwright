import{test,expect}from'@playwright/test';

test("Hidden Dropdown Handling",async({page})=>{
await page.goto('https://www.flipkart.com/');

  const search = page.locator('input[type=text]');
   await search.pressSequentially('book', { delay: 150 });
    const suggestions = page.locator("ul>li");
     await expect(suggestions.first()).toBeVisible();
    //  await suggestions.allTextContents().then(values=> {
    //     console.log(values);
    //  });   
    //inspect element by right click and ctrl+shift+p then run ->command 
    //-->emulate a focused page to get hidden element visible 
    const optionsCount = await suggestions.count();
    for(let i=0;i<optionsCount;++i){
        const text= await suggestions.nth(i).innerText();
         // if (text.toLowerCase().includes("book shelf")){
          if (text ==="book shelf"){
            await suggestions.nth(i).click();
            await page.pause();
            break;
        }   
    }

});
    