import { Response , expect, Page, Locator } from "@playwright/test";
import { myProfileLocator } from "./my-profile.locator";
import path from "path";
import { DataManager } from "../utils/data-manager";
import { DataForNormalCard } from "../test-data/types";

let caresouselCount = 0;
export class MyProfilePage{
    
    constructor(private page: Page,
        private locator= new myProfileLocator(page)){
        }
    
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
        await this.locator.projectModal.waitFor({state:'visible'});
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
    async uploadFileAndWait(page: Page, filePath: string, requestURL: string, mediaType: string): Promise<void> {
        // Trigger the file upload first
        const uploadPromise = this.locator.addMediaInputField.setInputFiles( filePath);
        // Wait for the specific upload API response after triggering the upload
        const uploadResponse = await page.waitForResponse((response: Response) => {
            const isUploadUrl = response.url().includes(requestURL); // your upload API URL
            const isPostMethod = response.request().method() === 'POST'; // ensure it's a POST request
            return isUploadUrl && isPostMethod;         
        });
        await page.waitForTimeout(1000);
        // Wait for the file upload to finish (the upload request triggered)
        await uploadPromise;
        caresouselCount++;
      }
    async uploadMedia(errors: string[], mediaFile: string[]) {
        caresouselCount = 0; //reset the number 
        let mediaArray: DataForNormalCard[] = [];
        const testData = DataManager.getInstance().getDataForNormalCard();
        for(const file of mediaFile){
            for (const media of testData) {
                if (media.file === file) {
                    mediaArray.push(media);
                }
            }
            for (const media of mediaArray) { 
                if (media.file === 'document' || media.file === 'audio' || media.file === 'gif') {
                    try {
                        const filePath = path.join(__dirname, media.path);
                        await this.uploadFileAndWait(
                            this.page, filePath, media.requestURL, media.type);
                        await expect(this.locator.fileNotSupportedError).not.toBeVisible();
                        
                    }catch(error){
                        errors.push('file is not supported');
                    }
                }  else if (media.file === 'webLink') {
                        try{
                            await this.locator.addWebLinkInputField.fill(media.path);
                            await this.locator.addWebLinkButton.click();
                            await expect(this.locator.noDataWeblinkError).not.toBeVisible({ timeout: 5000 });
                            await expect(this.locator.addWebLinkButton).toBeDisabled(
                                { timeout: 5000 }
                            );
                            caresouselCount++;
                        }catch(error){
                            errors.push('weblink not found')
                        }   
                } else {
                    try {
                        const filePath = path.join(__dirname, media.path);
                        await this.locator.addMediaInputField.setInputFiles(filePath);
                        await expect(this.locator.fileNotSupportedError).not.toBeVisible();
                        caresouselCount++;
                    }catch(error){
                        errors.push('file is not supported');
                    }
                }
                    if (media.haveConfirmationModal) {
                        try{
                            await this.locator.confirmationSaveButton.click();
                        }catch(error){
                            errors.push('no confirmation modal')
                        }
                    }      
            }
        }
        
        const carousel = await this.page.locator(this.locator.carouselContainer).all();
        expect.soft(carousel.length).toEqual(caresouselCount);
        return this;
    }
    async saveProjectCard(){
        await this.locator.saveButton.click();
        await expect(this.locator.projectModal).not.toBeVisible(
            {timeout: 10000}
        );
        return this;
    }
    async addMediaCard(){
        await this.locator.addContentButton.click();
        await this.locator.addMediaButton.click();
        await expect(this.locator.mediaCardModal).toBeVisible();
        return this;
    }
    async selectVizzyPrompt(prompt: string){
        await this.locator.mediaCardPromptContainer.click();
        const promptDropdownlist = await this.page.locator(this.locator.mediaCardDropdownPrompt).all();
        for(const dropdown of promptDropdownlist){
            const text = await dropdown.innerText();
            if(text === prompt){
                await dropdown.click();
            }
        }
        const selectedPrompt = await this.locator.mediaCardPromptContainer.textContent();
        console.log(selectedPrompt);
        expect(selectedPrompt).toContain(prompt);
        return this;
    }
    async addMediaCardHeadline(headline:string){
        await this.locator.mediaCardHeadline.fill(headline);
        return this;
    }
    async saveMediaCard(){
        await this.locator.saveButton.click();
        await expect(this.locator.mediaCardModal).not.toBeVisible(
            {timeout:10000}
        );
    }
};

