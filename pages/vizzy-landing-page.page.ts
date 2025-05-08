import { Page, expect } from "@playwright/test";
import { VizzyLandingPageLocator } from "./vizzy-landing-page.locator";
import { MyProfilePage } from "./my-profile.page";

export class VizzyLandingPage{
    constructor(private page: Page,
        private locator= new VizzyLandingPageLocator(page)){}
    
    async launch(URL:string) : Promise<VizzyLandingPage>{
        await this.page.goto(URL, {waitUntil: "commit"});
        return this;
    }
    async clickLoginButton(){
        await this.locator.loginButton.click();
        return this;
    }
    async fillEmail(email:string){
        await this.locator.emailInput.fill(email);
        return this;
    }
    async fillPassword(password:string){
        await this.locator.passwordInput.fill(password);
        return this;
    }
    async signIn(): Promise<MyProfilePage>{
        await this.locator.signInButton.click();
        return new MyProfilePage(this.page);
    }
    async allowAllCookie(){
        await this.locator.allowAllCookie.click();
        return this;
    }
    async clickSignUpButton(){
        await this.locator.signUpButton.click();
        return this;
    }
    async fillFirstName(firstName:string){
        await this.locator.firstName.fill(firstName);
        return this;
    } 
    async fillLastName(lastName:string){
        await this.locator.lastName.fill(lastName);
        return this;
    }
    async clickRegisterButton(){
        await this.locator.registerButton.click();
        await expect(this.locator.verificationModal).toBeVisible({timeout: 10000});
        return this;
    }
    async fillVerificationCode(code:string){
        await this.locator.verificationCodeInput.fill(code);
        return this;
    }
    async continue(){
        await this.locator.continueButton.click();
        return this;
    }
};
