import { test, expect } from "@playwright/test";
import { DataManager } from "../utils/data-manager";
import { VizzyLandingPage } from "../pages/vizzy-landing-page.page";
import { MyProfilePage } from "../pages/my-profile.page";
import path from "path";
import { SettingPage } from "../pages/setting.page";

test.describe('free-user', async () => {
  let authState: {
      cookies: {
          name: string;
          value: string;
          domain: string;
          path: string;
          expires: number;
          httpOnly: boolean;
          secure: boolean;
          sameSite: "Strict" | "Lax" | "None";
      }[];
      origins: {
          origin: string;
          localStorage: {
              name: string;
              value: string;
          }[];
      }[];
  }; 

  test.beforeAll('login', async({browser})=>{
      const testUser = DataManager.getInstance().getUserData();
      const context = await browser.newContext();
      const vizzyPage = await context.newPage();
      await new VizzyLandingPage(vizzyPage)
          .launch()
          .then(landingPage => landingPage.allowAllCookie())
          .then(landingPage => landingPage.clickLoginButton())
          .then(landingPage => landingPage.fillEmail(testUser.email))
          .then(landingPage => landingPage.fillPassword(testUser.password))
          .then(landingPage => landingPage.signIn())
          .then(myProfilePage => myProfilePage.verifyMyProfileTitle());
      authState = await context.storageState();
      await context.close();
  });
  test('test', async({browser})=>{
    const context = await browser.newContext({storageState:authState});
    const page = await context.newPage();

    await page.goto('https://staging.vizzy.com/');
    await page.locator(`//div[contains(@class,'Media_media__4HM3f Media_square__LuUd8')]/button/img[@alt="A musician stands on stage with a guitar, arms outstretched, in front of a large, cheering crowd."]`).scrollIntoViewIfNeeded();
    await expect(page.locator(`//div[contains(@class,'Media_media__4HM3f Media_square__LuUd8')]/button/img[@alt="A musician stands on stage with a guitar, arms outstretched, in front of a large, cheering crowd."]`)).toBeVisible();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.locator(`//div[contains(@class,'Media_media__4HM3f Media_square__LuUd8')]/button/img[@alt="A close-up of a person's face with a serious expression, featuring dark hair and a blurred background."]`)).toBeVisible();
    await page.waitForTimeout(5000);
  });



});