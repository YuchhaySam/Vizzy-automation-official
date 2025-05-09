import { Response , expect, Page } from "@playwright/test";
import { SettingLocator } from "./setting.locator";
import { MyProfilePage } from "./my-profile.page";

export class SettingPage{
    constructor(private page: Page,
      private locator = new SettingLocator(page)){
      }
  async clickOnSettingIcon(){
    await this.locator.settingIcon.click();
    return this;
  }
  async clickOnRetakeTest(){
    await this.locator.retakeTestButton.click();
    return new MyProfilePage(this.page);
  }
  async clickOnCreateManageJob(){
    await this.locator.createAndManageJob.click();
    return this;
  }
};


