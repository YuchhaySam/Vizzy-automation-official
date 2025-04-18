import {type Page} from '@playwright/test';

export class VizzyLandingPageLocator{
    constructor(readonly page: Page){}

    get loginButton(){
        return this.page.getByRole('button', { name: 'Log in' });
    }
    get emailInput(){
        return this.page.getByRole('textbox', { name: 'Email' });
    }
    get passwordInput(){
        return this.page.getByRole('textbox', { name: 'Password' });
    }
    get signInButton(){
        return this.page.getByRole('button', { name: 'Sign in' });
    }
    get allowAllCookie(){
        return this.page.getByRole('button', { name: 'Allow all' });
    }
};
