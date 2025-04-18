import test, { expect, Page } from "@playwright/test";
import { myProfileLocator } from "./my-profile.locator";
import path from "path";
import { DataManager } from "../utils/data-manager";


export class MyProfilePage{
    constructor(private page: Page,
        private locator= new myProfileLocator(page)){}
    
    async verifyMyProfileTitle(): Promise<this>{
        const title = "Profile | Vizzy";
        await expect(this.page).toHaveTitle(title);
        return this;
    }
    async openBioEmptyState(){
        await this.locator.bioButton.hover();
        await this.locator.bioButton.click();
        return this;
    }
    async fillLocation(location:string){
        await this.locator.locationInputField.fill(location);
        return this;
    }
    async selectDropdown(location:string){
        await this.page.waitForSelector(this.locator.DropdownList,
            {state: 'visible'}
        );
        const dropdown  = await this.page.locator(this.locator.DropdownList).all();
        for(const item of dropdown){
            const text = await item.innerText();
            if(text === location){
                await item.click();
                break;
            }
        }
        return this;
    }
    async clickOnPronounDropDown(){
        await this.locator.pronounDropDownField.click();
        return this;
    }
    async fillHeadline(headline:string){
        await this.locator.headLineInputField.fill(headline);
        return this;
    }
    async fillBusinessFacility(businessFacility:string){
        await this.locator.businessFacilityInputField.fill(businessFacility);
        return this;
    }
    async fillBusinessFacilityURL(businessFacilityURL:string){
        await this.locator.businessFacilityURL.fill(businessFacilityURL);
        return this;
    }
    async fillBio(bio:string){      
        await this.locator.bioInputField.fill(bio);
        return this;
    }
    async clickSaveAndVerifyModal(){
        await this.locator.saveButton.click();
        await expect(this.locator.bioCardModal).not.toBeVisible(
            {timeout: 10000}
        );
        return this;
    }
    async verifyAboutYouContents(pronoun:string, location:string, 
        bio:string, headline:string){
        await expect.soft(this.locator.aboutYouPronouns).toHaveText(pronoun);
        await expect.soft(this.locator.aboutYouBLocation).toHaveText(location);
        await expect.soft(this.locator.aboutYouHeadline).toHaveText(headline);
        await expect.soft(this.locator.aboutYouBio).toHaveText(bio);
        return this;
    }
    async openUploadProfileEmtpyState(){
        await this.locator.bioImageButton.hover();
        await this.locator.bioImageButton.click();
        return this;
    }
    async uploadProfileImage(imagePath: string, errors: string[]){
       await this.locator.profilePictureUploadField.setInputFiles(imagePath);
        try{
            await this.locator.confirmationSaveButton.click({timeout:3000});
            await this.locator.profileUploadConfirmationModal.waitFor({
                state: 'hidden'
            });
        }catch(error){
            errors.push('Modal did not appear')
        }
        try{
            await this.locator.uploadedProfilePicture.waitFor({ timeout: 3000 });
            const imagePreview = await this.locator.uploadedProfilePicture
            .getAttribute('src');
            expect(imagePreview).toMatch(/^data:image\//);
        }catch(error){
            errors.push('No Image found');
        }
        return this;
    };
    async fillCoverVideo(videoURL:string){
        await this.locator.covervideoInputField.fill(videoURL);
        return this;
    }
    async addProjectCard(){
        await this.locator.addContentButton.click();
        await this.locator.addProjectButton.click();
        await expect(this.locator.projectModal).toBeVisible();
        return this;
    }
    async addProjectHeadline(headline:string){
        await this.locator.addProjectHeadline.fill(headline);
        return this;
    }
    async addStartDate(startDate:string){
        await this.locator.addStartDate.fill(startDate);
        return this;
    }
    async addEndDate(endDate:string){
        await this.locator.addEndDate.fill(endDate);
        return this;
    }
    async addDescription(description:string){
        await this.locator.addCardDescription.fill(description);
        return this;
    }
    async uploadMedia(errors: string[], mediaFile: string){
        let caresouselCount = 0;
        const testData = DataManager.getInstance().getDataForNormalCard();
        for(const media of testData){
            if(media.file === mediaFile){
                if(media.type !== 'youtube-video' && media.type !== 'vimeo-video' && media.type !== 'normal-weblink'){
                    
                    try{
                        const filePath = path.join(__dirname, media.path);
                        await this.locator.addMediaInputField.setInputFiles(filePath);
                        await expect(this.locator.fileNotSupportedError)
                            .not.toBeVisible();
                        caresouselCount++;
                    }catch(error){
                        errors.push('File not supported');
                    }
                }else{
                    try{
                        await this.locator.addWebLinkInputField.fill(media.path);
                        await this.locator.addWebLinkButton.click();
                        await expect(this.locator.noDataWeblinkError)
                            .not.toBeVisible({timeout: 5000});
                        caresouselCount++;
                    }catch(error){  
                        errors.push('No weblink found');
                    }
                }
            } 
            if(media.haveConfirmationModal === true){
                try{
                    await this.locator.confirmationSaveButton.click();
                }catch(error){
                    errors.push('confirmation modal did not appear');
                }
            }else{
                continue;
            }
        }
        const carousel = await this.page.locator(this.locator.carouselContainer).all();
        try{
            expect(carousel.length).toEqual(caresouselCount);
        } catch(error){
            errors.push('Careosuel number does not match');
        }
        
        return this;
    }
    async saveProjectCard(){
        await this.locator.saveButton.click();
        await expect(this.locator.projectModal).not.toBeVisible(
            {timeout: 10000}
        );
        return this;
    }
};
