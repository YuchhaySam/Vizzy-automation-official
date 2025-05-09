import { Response , expect, Page } from "@playwright/test";
import { CreateManageJobLocator } from "./create-manage-job.locator";
import { JobDetail } from "../test-data/types";

export class CreateManageJobPage{
    constructor(private page: Page,
      private locator = new CreateManageJobLocator(page)){
      }
    async createNewJob(copy:string){
      await this.locator.createNewJobButton.click();
      await this.locator.jobDetailCopy.scrollIntoViewIfNeeded();
      await expect(this.locator.jobDetailCopy).toContainText(copy, {timeout: 10000});
      return this;
    }
    async fillJobTitle(title:string){
      await this.locator.jobTitle.fill(title);
      return this;
    }
    async fillJobCode(code:string){
      await this.locator.jobCode.fill(code);
      return this;
    }
    async fillStartDate(startDate:string){
      await this.locator.startDate.fill(startDate);
      return this;
    }
    async fillEndDate(endDate:string){  
      await this.locator.endDate.fill(endDate);
      return this;
    }
    async selectApplicationType(type:string){
      await this.locator.applicationTypeContainer.click();
      const applicationType = await this.locator.applicationTypeDropdown(type);
      await applicationType.click();
      return this;
    }
    async jobDescription(description:string){
      await this.locator.jobDescription.fill(description);
      return this;
    }
    async jobRequirement(requirement:string){
      await this.locator.jobRequirement.fill(requirement);
      return this;
    }
    async selectEmploymentType(type:string){
      await this.locator.employmentTypeContainer.click();
      const employmentType = await this.locator.employmentTypeDropdown(type);
      await employmentType.click();
      return this;
    }
    async selectWorkModel(type:string){
      const workModel = await this.locator.workModel(type);
      await workModel.click();
      return this;
    }
    async fillExpectedStartDate(expectedStartDate:string){
      await this.locator.expectedStartDate.fill(expectedStartDate);
      return this;
    }
    async selectCurrency(type:string){
      await this.locator.currencyContainer.click();
      const currency = await this.locator.currencyDropdown(type);
      await currency.click();
      return this;
    }
    async fillMinSalary(minSalary:string){
      await this.locator.minSalary.fill(minSalary);
      return this;
    }
    async fillMaxSalary(maxSalary:string){
      await this.locator.maxSalary.fill(maxSalary);
      return this;
    }
    async fillCityAndCountry(city:string, country:string, workModel:string){
      if(workModel === 'Onsite'){
        expect(this.locator.city).toBeVisible();
        expect(this.locator.country).toBeVisible();
        await this.locator.city.fill(city);
        await this.locator.country.fill(country);
        return this;
      }
      return; 
    }
    async fillJobDetail(
      config : JobDetail
    ){
      await this.fillJobTitle(config.title);
      await this.fillJobCode(config.code);
      await this.fillStartDate(config.startDate);
      await this.fillEndDate(config.endDate);
      await this.selectApplicationType(config.applicationType);
      await this.jobDescription(config.description);
      await this.jobRequirement(config.requirement);
      await this.selectEmploymentType(config.employmentType);
      await this.selectWorkModel(config.workModel);
      await this.fillExpectedStartDate(config.expectedStartDate);
      await this.selectCurrency(config.currency);
      await this.fillMinSalary(config.minSalary);
      await this.fillMaxSalary(config.maxSalary);
      await this.fillCityAndCountry(
        config.city, 
        config.country, 
        config.workModel);
      return this;
    }
    async saveJobDetail(){
      await this.locator.saveContent.click();
      await expect(this.locator.saveContent).toBeDisabled();
      await expect(this.locator.contentSavedMessage).toBeVisible();
      return this;
    }
};



