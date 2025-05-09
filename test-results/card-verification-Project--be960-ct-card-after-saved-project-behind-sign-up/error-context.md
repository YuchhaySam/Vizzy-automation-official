# Test info

- Name: Project card >> verify pdf project card after saved @project
- Location: C:\Users\samyu\OneDrive\Documents\Vizzy-automation-official\tests\card-verification.spec.ts:135:9

# Error details

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://staging.vizzy.com/", waiting until "commit"

    at VizzyLandingPage.launch (C:\Users\samyu\OneDrive\Documents\Vizzy-automation-official\pages\vizzy-landing-page.page.ts:10:25)
    at C:\Users\samyu\OneDrive\Documents\Vizzy-automation-official\tests\card-verification.spec.ts:50:26
```

# Test source

```ts
   1 | import { Page, expect } from "@playwright/test";
   2 | import { VizzyLandingPageLocator } from "./vizzy-landing-page.locator";
   3 | import { MyProfilePage } from "./my-profile.page";
   4 |
   5 | export class VizzyLandingPage{
   6 |     constructor(private page: Page,
   7 |         private locator= new VizzyLandingPageLocator(page)){}
   8 |     
   9 |     async launch(URL:string) : Promise<VizzyLandingPage>{
> 10 |         await this.page.goto(URL, {waitUntil: "commit"});
     |                         ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  11 |         return this;
  12 |     }
  13 |     async clickLoginButton(){
  14 |         await this.locator.loginButton.click();
  15 |         return this;
  16 |     }
  17 |     async fillEmail(email:string){
  18 |         await this.locator.emailInput.fill(email);
  19 |         return this;
  20 |     }
  21 |     async fillPassword(password:string){
  22 |         await this.locator.passwordInput.fill(password);
  23 |         return this;
  24 |     }
  25 |     async signIn(): Promise<MyProfilePage>{
  26 |         await this.locator.signInButton.click();
  27 |         return new MyProfilePage(this.page);
  28 |     }
  29 |     async allowAllCookie(){
  30 |         await this.locator.allowAllCookie.click();
  31 |         return this;
  32 |     }
  33 |     async clickSignUpButton(){
  34 |         await this.locator.signUpButton.click();
  35 |         return this;
  36 |     }
  37 |     async fillFirstName(firstName:string){
  38 |         await this.locator.firstName.fill(firstName);
  39 |         return this;
  40 |     } 
  41 |     async fillLastName(lastName:string){
  42 |         await this.locator.lastName.fill(lastName);
  43 |         return this;
  44 |     }
  45 |     async clickRegisterButton(){
  46 |         await this.locator.registerButton.click();
  47 |         await expect(this.locator.verificationModal).toBeVisible({timeout: 10000});
  48 |         return this;
  49 |     }
  50 |     async fillVerificationCode(code:string){
  51 |         await this.locator.verificationCodeInput.fill(code);
  52 |         return this;
  53 |     }
  54 |     async continue(){
  55 |         await this.locator.continueButton.click();
  56 |         return this;
  57 |     }
  58 | };
  59 |
```