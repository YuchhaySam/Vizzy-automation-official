import { Page } from "@playwright/test";
import { MailinatorLocator } from "./mailinator.locator";

export class MailinatorPage{
    constructor(private page: Page,
        private locator= new MailinatorLocator(page)){}

    async launch(URL:string){
        await this.page.goto(URL, {waitUntil: "commit"});
        return this;
    }
    async goIntoInbox(){
        await this.locator.inboxContainer.click();
        return this;
    }
    async getVerificationCode(){
        //await this.locator.verificationCode.waitFor({state: "visible"});
        const code = await this.locator.verificationCode.textContent();
        return code ? code.trim() : '';
    }
};
