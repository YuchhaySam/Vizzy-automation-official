import {type Page} from '@playwright/test';

export class SettingLocator{
    constructor(readonly page: Page){}
    
  get retakeTestButton(){
    return this.page.getByRole('button', { name: 'Retake the test' });
  }
  get settingIcon(){
    return this.page.getByRole('link', { name: 'Settings' });
}
};