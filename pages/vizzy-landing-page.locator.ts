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
    get signUpButton(){
        return this.page.getByRole('button', { name: 'Create your free profile' });
    }
    get firstName(){
        return this.page.getByRole('textbox', { name: 'First name(this field is' });
    }
    get lastName(){
        return this.page.getByRole('textbox', { name: 'Last name(this field is' });
    }
    get registerButton(){
        return this.page.getByRole('button', { name: 'Create my account' });
    }
    get verificationModal(){
        return this.page.getByText('Please verify your emailEnter');
    }
    get verificationCodeInput(){
        return this.page.getByRole('textbox', { name: 'Enter 6 digit one-time' });
    }
    get continueButton(){
        return this.page.getByRole('button', { name: 'Continue' });
    }
};
