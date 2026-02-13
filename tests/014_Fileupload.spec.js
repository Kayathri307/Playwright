
import{test,expect}from"@playwright/test";

test('File Upload Test',async({page})=>{
 await page.goto('https://practice.expandtesting.com/upload');
  const filePath = 'C:/Class/Learning/Resources/demo.docx';
    const uploadInput= page.locator('input[type="file"]');
    //setInputFiles() uploads files by setting them directly on the <input type="file"> 
    // DOM element. It bypasses the OS file picker
    await uploadInput.setInputFiles(filePath);
    await page.locator('#fileSubmit').click();
    const uploadedFileName= page.locator('#uploaded-files');
    await expect(uploadedFileName).toContainText('demo.docx');

});