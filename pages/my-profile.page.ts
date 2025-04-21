import { Response , expect, Page } from "@playwright/test";
import { myProfileLocator } from "./my-profile.locator";
import path from "path";
import { DataManager } from "../utils/data-manager";
import { DataForNormalCard } from "../test-data/types";
import { SettingPage } from "./setting.page";

let caresouselCount = 0;
export class MyProfilePage{
    
    constructor(private page: Page,
        private locator= new myProfileLocator(page)){
        }
    
    async verifyMyProfileTitle(): Promise<this>{
        const title = "Profile | Vizzy";
        await expect(this.page).toHaveTitle(title, {timeout: 5000});
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
        await expect(this.locator.projectCardTitle).toHaveText('Add project card');
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
    async uploadFileAndWait(page: Page, filePath: string, requestURL: string | null, mediaType: string): Promise<void> {
        // Trigger the file upload first
        const uploadPromise = this.locator.addMediaInputField.setInputFiles( filePath);
        // Wait for the specific upload API response after triggering the upload
        const uploadResponse = await page.waitForResponse((response: Response) => {
            const isUploadUrl = requestURL ? response.url().includes(requestURL) : false;
            const isPostMethod = response.request().method() === 'POST'; 
            return isUploadUrl && isPostMethod;         
        });
        await page.waitForTimeout(1000);
        // Wait for the file upload to finish (the upload request triggered)
        await uploadPromise;
        caresouselCount++;
      }
    async uploadMedia(errors: string[], mediaFile: string) {
        caresouselCount = 0; //reset the number 
        let mediaArray: DataForNormalCard[] = [];
        const testData = DataManager.getInstance().getDataForNormalCard();
        for (const media of testData) {
            if (media.file === mediaFile) {
                mediaArray.push(media);
            }
        }
        for (const media of mediaArray) { 
            if (media.file === 'document' || media.file === 'audio') {
                try {
                    const filePath = path.join(__dirname, media.path);
                    await this.uploadFileAndWait(
                        this.page, filePath, media.requestURL, media.type);
                    await expect.soft(this.locator.fileNotSupportedError).not.toBeVisible();
                    
                }catch(error){
                    errors.push('file is not supported');
                }
            }  else if (media.file === 'webLink') {
                    try{
                        await this.locator.addWebLinkInputField.fill(media.path);
                        await this.locator.addWebLinkButton.click();
                        caresouselCount++;
                        await expect.soft(this.locator.noDataWeblinkError).not.toBeVisible({ timeout: 5000 });
                        await expect(this.locator.addWebLinkButton).toBeDisabled(
                            { timeout: 5000 }
                        );
                    }catch(error){
                        errors.push('weblink not found')
                    }   
            } else {
                try {
                    const filePath = path.join(__dirname, media.path);
                    await this.locator.addMediaInputField.setInputFiles(filePath);
                    media.file === 'image'? console.log('image') 
                        : await this.page.waitForSelector(this.locator.carouselContainer,
                        {state:'visible'}
                    );
                    await expect.soft(this.locator.fileNotSupportedError).not.toBeVisible();
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
        return this;
    }
    
    async countCarousel(){
        const count = caresouselCount;
        const carouselLocator = this.page.locator(this.locator.carouselContainer);
        const carousel = await carouselLocator.all();
        expect.soft(carousel.length).toEqual(count);
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
        await expect(this.locator.mediaCardTitle).toHaveText('Add media card');
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
        return this;
    }
    async addQACard(){
        await this.locator.addContentButton.click();
        await this.locator.addQAButton.click();
        await expect(this.locator.QAModal).toBeVisible();
        await expect(this.locator.QACardTitle).toHaveText('Add Q&A card');
        return this;
    }
    async selectQAQuestion(questionText: string){
        await this.locator.QAQuestionsDropdownContainer.click();
        const allQuestions = await this.locator.QAQuestionsDropdownSelection.all();
        for(const questions of allQuestions){
            const text = await questions.innerText();
            if(questionText === text){
                await questions.click();
            }
        }
        await expect(this.locator.QAQuestionsDropdownContainer).toHaveText(questionText);
        return this;
    }
    async answeringQA(description: string){
        await this.locator.addCardDescription.fill(description);
        return this;
    }
    async saveQACard(){
        await this.locator.saveButton.click();
        await expect(this.locator.QAModal).not.toBeVisible(
            {timeout: 10000}
        );
        return this;
    }
    async addPsychCard(){
        await this.locator.addPsychometricButton.hover();
        await this.locator.addPsychometricButton.click();
        return this;
    }
    async clickOnTakeTest(){
        await expect(this.locator.psychoCardTitle).toHaveText('How does the psychometrictest work?');
        await this.locator.takeTestButton.click();
        await expect(this.locator.psychModal).toBeVisible();
        await this.locator.psychAnswer.first().waitFor({state:'visible'});
        return this;
    }

    async answerAndRateQuestion(
        answerIndex1: number,
        answerIndex2: number,
        ratingIndex1: number,
        ratingIndex2: number
    ): Promise<void> {
        const answerCount = await this.locator.psychAnswer.count();
        if (answerIndex1 >= answerCount || answerIndex2 >= answerCount || answerIndex1 < 0 || answerIndex2 < 0 || answerIndex1 === answerIndex2) {
            throw new Error(`Invalid answer indices provided (${answerIndex1}, ${answerIndex2}) for ${answerCount} available answers.`);
        }
        const firstAnswer = this.locator.psychAnswer.nth(answerIndex1);
        const secondAnswer = this.locator.psychAnswer.nth(answerIndex2);
        await firstAnswer.click();  
        await secondAnswer.click();

        await expect(this.locator.ratingButton.first()).toBeVisible();
        const ratingCount = await this.locator.ratingButton.count();
        if (ratingIndex1 >= ratingCount || ratingIndex2 >= ratingCount || ratingIndex1 < 0 || ratingIndex2 < 0) {
             throw new Error(`Invalid rating indices provided (${ratingIndex1}, ${ratingIndex2}) for ${ratingCount} available ratings.`);
        }
        const firstRating = this.locator.ratingButton.nth(ratingIndex1);
        const secondRating = this.locator.ratingButton.nth(ratingIndex2);

        await firstRating.click();
        await secondRating.click();
        await expect(this.locator.psychNextButton).toBeEnabled();
        await this.locator.psychNextButton.click();
        await expect(this.locator.psychAnswer.first()).toBeVisible(); 
    }

    async answerAndRatePsych(){
        const psychAnswer = DataManager.getInstance().getPsychAnswer();
        for (const step of psychAnswer) {
            console.log(`--- Starting Page ${step.page} ---`);
            await this.answerAndRateQuestion(
                step.answerIndex1,
                step.answerIndex2,
                step.ratingIndex1,
                step.ratingIndex2
            );
        }
        const hePronounce = this.locator.psychAnswer.nth(0);
        const shePronounce = this.locator.psychAnswer.nth(1);
        const theyPronounce = this.locator.psychAnswer.nth(2);

        await hePronounce.click();
        await this.locator.psychSubmitButton.click();
        await expect(this.locator.psychSubmitButton).not.toBeVisible();
        return this;
    }
    async verifyPsychCard(){
        const cardLocator = this.locator.completePsychCard;
        await expect(cardLocator).toContainText(/Introverted\W*feeling/i);
        await expect(cardLocator).toContainText(/Introverted\W*thinking/i);
        await expect(cardLocator).toContainText(/Extroverted\W*feeling/i);
        await expect(cardLocator).toContainText(/Extroverted\W*thinking/i);
    }
    async clickOnMyProfileIcon(){
        await this.locator.myProfileIcon.click();
        return this;
    }
};

