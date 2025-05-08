import {type Page} from '@playwright/test';

export class MailinatorLocator{
    constructor(readonly page: Page){}


    get inboxContainer(){
        return this.page.locator(`//td[normalize-space()='hello@vizzy.com']`);
    }
    get verificationCode(){
        return this.page.locator('iframe[name="html_msg_body"]')
            .contentFrame().locator('tr h2:nth-child(1)')
    }
};
