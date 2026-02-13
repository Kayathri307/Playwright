export class LoginPage{
    
    constructor(page){

        this.page= page;
        this.userName= page.locator("#userEmail");
        this.password= page.locator("#userPassword");
        this.loginButton= page.locator("#login");
    }

   async gotoUrl(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

async validateLogin(userName, password){

   await this.userName.fill(userName);
   await this.password.fill(password);
   await this.loginButton.click();
   await this.page.waitForLoadState('networkidle');
}


    
}