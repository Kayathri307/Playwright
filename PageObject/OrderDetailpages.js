export class OrderDetailPages{
    constructor(page){
        this.page= page;
        this.CountryInput = page.getByPlaceholder('Select Country');
        this.dropdown = page.locator(".ta-results");
        this.optionslocator = this.dropdown.locator("button");
        this.optionsCount = this.dropdown.locator("button");
        this.userName = page.locator(".user__name [type='text']").first();
        this.submitButton = page.locator(".action__submit");
    }
    async selectCountry(countryName){
        await this.CountryInput.pressSequentially(countryName, { delay: 150 });
         await this.dropdown.waitFor();
         const optionsCount = await this.optionsCount.count();
         for (let i = 0; i < optionsCount; ++i) {
              const text = await this.optionslocator.nth(i).textContent();
              if (text ?.trim() === countryName) {
                 await this.optionslocator.nth(i).click();
                 break;
              }
           }



        
       
    }
    async submitOrder(){
        ;
        await this.submitButton.click();
    }
    async getUserName(){
        return await this.userName.first().textContent();
    }

}