import {type Page} from '@playwright/test';

export class CreateManageJobLocator{
    constructor(readonly page: Page){}

  get createNewJobButton(){
    return this.page.getByRole('link', { name: 'Create a new job' });
  }
  get jobDetailCopy(){
    return this.page.getByText('This section outlines the');
  }
  get jobTitle(){
    return this.page.getByRole('textbox', { name: 'Job title(this field is' });
  }
  get jobCode(){
    return this.page.getByRole('textbox', { name: 'Code(this field is required)' });
  }
  get startDate(){
    return this.page.getByRole('textbox', { name: 'Applications open from(this' });
  }
  get endDate(){
    return this.page.getByRole('textbox', { name: 'Applications open until button' });
  }
  get applicationTypeContainer(){
    return this.page.locator('span').filter({ hasText: 'Select' }).first();
  }
  async applicationTypeDropdown(type: string){
    return this.page.getByRole('button', { name: type })
  }
  get jobDescription(){
    return this.page.getByRole('paragraph').nth(1);
  }
  get jobRequirement(){
    return this.page.getByRole('paragraph').nth(2);
  }
  get employmentTypeContainer(){
    return this.page.getByText('Employment type *');
  }
  async employmentTypeDropdown(type:string){
    return this.page.getByRole('button', { name: type })
  }
  async workModel(type:string){
    return this.page.getByRole('listitem')
        .filter({ hasText: type })
        .locator('span').first()
  }
  get expectedStartDate(){
    return this.page.getByRole('textbox', { name: 'Expected start date button' });
  }
  get currencyContainer(){
    return this.page.getByText('Currency');
  }
  async currencyDropdown(type:string){
    return this.page.getByRole('button', { name: type })
  }
  get addPreRequisite(){
    return this.page.getByRole('button', { name: 'Add question' });
  }
  get preRequisiteQuestion(){
    return this.page.getByRole('textbox', { name: 'Prerequisite question(this' });
  }
  get preRequisiteAnswer(){
    return this.page.getByRole('textbox', { name: 'Answer' });
  }
  get preRequisiteSave(){
    return this.page.locator('#modal-lightbox').getByRole('button', { name: 'Save' });
  }
  get preRequisiteModal(){
    return this.page.getByText('Add questionPrerequisite');
  }
  get multipleAnswer(){
    return this.page.locator('label').filter({ hasText: 'Allow multiple answers' }).locator('span');
  }
  get minSalary(){
    return this.page.getByRole('spinbutton', { name: 'Minimum salary' });
  }
  get maxSalary(){
    return this.page.getByRole('spinbutton', { name: 'Maximum salary' });
  }
  get saveContent(){
    return this.page.getByRole('button', { name: 'Save' });
  }
  get country(){
    return this.page.getByRole('textbox', { name: 'Country(this field is' });
  }
  get city(){
    return this.page.getByRole('textbox', { name: 'City' });
  }
  get contentSavedMessage(){
    return this.page.getByText('Content saved');
  }
};