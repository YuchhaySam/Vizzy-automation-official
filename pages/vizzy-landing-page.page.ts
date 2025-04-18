import { Locator, Page } from "@playwright/test";
import { VizzyLandingPageLocator } from "./vizzy-landing-page.locator";
import { MyProfilePage } from "./my-profile.page";

export class VizzyLandingPage{
    constructor(private page: Page,
        private locator= new VizzyLandingPageLocator(page)){}
    
    async launch() : Promise<VizzyLandingPage>{
        await this.page.goto('https://staging.vizzy.com');
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
};
