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
        await expect(this.page).toHaveTitle(title, {timeout:10000});
        return this;
    }
    async fillBespoken(name:string){
        await this.locator.bespokenInput.fill(name);
        await this.locator.besopkenSaveButton.click();
        await expect(this.locator.bespokenInput).not.toBeVisible(
            {timeout: 10000}
        );
        await this.locator.skipButton.click();
        return this;
    }
    async openBioEmptyState(){
        await this.locator.bioButton.hover();
        await this.locator.bioButton.click();
        return this;
    }
    async fillLocation(location:string){
        await this.checkIfFieldIsRequire(this.locator.locationInputField);
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
            await this.locator.confirmationSaveButton.click({timeout:3000});
            await this.locator.UploadConfirmationModal.waitFor({
                state: 'hidden'
            });
            await this.locator.uploadedProfilePicture.waitFor({ timeout: 3000 });
            const imagePreview = await this.locator.uploadedProfilePicture
            .getAttribute('src');
            expect(imagePreview).toMatch(/^data:image\//);
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
        await this.checkIfFieldIsRequire(this.locator.addProjectHeadline);
        await this.locator.addProjectHeadline.fill(headline);
        return this;
    }
    async addStartDate(startDate:string){
        await this.checkIfFieldIsRequire(this.locator.addStartDate);
        await this.locator.addStartDate.fill(startDate);
        return this;
    }
    async addEndDate(endDate:string){
        await this.locator.addEndDate.fill(endDate);
        return this;
    }
    async addDescription(description:string){
        await this.checkIfFieldIsRequire(this.locator.addCardDescription);
        await this.locator.addCardDescription.fill(description);
        return this;
    }
    async uploadFileAndWait(page: Page, filePath: string, requestURL: string | null, mediaType: string): Promise<void> {
        // Trigger the file upload first
        const uploadPromise = this.locator.addMediaInputField.setInputFiles(filePath);
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
                const filePath = path.join(__dirname, media.path);
                await this.uploadFileAndWait(
                    this.page,
                    filePath, 
                    media.requestURL, 
                    media.type
                );
                await expect.soft(this.locator.fileNotSupportedError).not.toBeVisible();
            }  else if (media.file === 'webLink') {
                    await this.locator.addWebLinkInputField.fill(media.path);
                    await this.locator.addWebLinkButton.click();
                    caresouselCount++;
                    await expect.soft(this.locator.noDataWeblinkError).not.toBeVisible({ timeout: 5000 });
                    await expect(this.locator.addWebLinkButton).toBeDisabled(
                        { timeout: 7000 }
                    );
            } else {
                    await expect(async()=>{
                        const filePath = path.join(__dirname, media.path);
                        await this.locator.addMediaInputField.setInputFiles(filePath);
                        media.file === 'image'? console.log('image') 
                            : await this.page.waitForSelector(this.locator.carouselContainer,
                            {state:'visible'}
                        );
                        await expect.soft(this.locator.fileNotSupportedError).not.toBeVisible();
                        caresouselCount++;
                        if (media.haveConfirmationModal) {
                            await this.locator.confirmationSaveButton.click();
                            await expect(this.locator.cardImagEditModal).not.toBeVisible();
                        }
                    }).toPass({timeout: 14000, intervals:[7000]});         
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
            {timeout: 12000}
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
        await this.checkIfFieldIsRequire(this.locator.addCardDescription);
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
        await expect.soft(cardLocator).toContainText(/Introverted\W*feeling/i);
        await expect.soft(cardLocator).toContainText(/Introverted\W*thinking/i);
        await expect.soft(cardLocator).toContainText(/Extroverted\W*feeling/i);
        await expect.soft(cardLocator).toContainText(/Extroverted\W*thinking/i);
    }
    async clickOnMyProfileIcon(){
        await this.locator.myProfileIcon.click();
        return this;
    }
    async verifyProjectCardInformationContent(
        headline: string,
        date:string,
        description: string,
        errors : string[]
    ){
        try{
            await this.locator.DescriptionAfterSaved.scrollIntoViewIfNeeded();
            await expect.soft(this.locator.projectCardTitleAfterSaved).toHaveText('Project');
            await expect.soft(this.locator.headlineAfterSaved).toHaveText(headline);
            await expect.soft(this.locator.projectCardDateAfterSaved).toHaveText(date);
            await expect.soft(this.locator.DescriptionAfterSaved).toHaveText(description);
        }catch(error){
            errors.push('Information is not visible')
        }
        
        return this;
    }
    async deleteCard(){
        await this.locator.DescriptionAfterSaved.scrollIntoViewIfNeeded();
        await this.locator.DescriptionAfterSaved.hover();
        await this.page.evaluate(() => window.scrollBy(0, -100));
        await this.locator.deleteCardButton.click();
        await expect(this.locator.deleteCardModal).toBeVisible();
        await this.locator.confirmToDeleteButton.click();
        await expect(this.locator.DescriptionAfterSaved).not.toBeVisible();
        return this;
    }
    async checkAudioThumbnail(errors: string[]){
        const audioLocator = this.locator.audioLocator;
        let count = 0;
        try{
            for(const audio of audioLocator){
                await expect.soft(audio.thumbnail).toBeVisible();
                await expect.soft(audio.thumbnail).toHaveCSS('background-color', 'rgb(178, 223, 215)');
                await audio.playButton.click();
                await expect.soft(this.locator.audioPlayerModal).toBeVisible();
                await this.page.keyboard.press('Escape');
                count++;
                count < audioLocator.length ? 
                    await this.locator.nextNavgiationOnContentButton.click()
                    : await expect(this.locator.nextNavgiationOnContentButton).toBeDisabled();
            }
        }catch(error){
            errors.push('No audio thumbnail found');
        }   
        return this;
    }
    async checkPdfThumbnail(errors: string[]){
        let count = 0;
        const pdfLocator = this.locator.pdfLocator;
        try{
            
            for(const pdf of pdfLocator){
                await expect.soft(pdf.thumbnail).toBeVisible({timeout: 10000});
                await pdf.button.click();
                await expect(pdf.modal).toBeVisible({timeout: 10000});
                await this.page.keyboard.press('Escape'); 
                count++;
                count < pdfLocator.length ? 
                    await this.locator.nextNavgiationOnContentButton.click()
                    : await expect(this.locator.nextNavgiationOnContentButton).toBeDisabled();
            }
        }catch(error){
            errors.push('No thumbnail on PDF');
        }
        return this;
    }
    async checkNewPageWhenClickOnHyperLink(locator: Locator, URL:string){
        const hyperLink = locator;
        const pagePromise = this.page.context().waitForEvent('page');
        await hyperLink.click();
        const newPage = await pagePromise;
        expect(newPage).toBeTruthy();
        await expect(newPage).toHaveURL(URL);
    }
    async checkWebLinkThumbnail(errors: string[]){
        const testData = DataManager.getInstance().getDataForNormalCard();
        let webLinkURL :string[] = [];
        let count = 0;
        for(const data of testData){
            if(data.file === 'webLink'){
                webLinkURL.push(data.path);

            }
        }
        const webLinkLocator = this.locator.webLink;
        console.log(webLinkLocator.length)
        for(let i=0; i<webLinkLocator.length; i++){
            const webLink = webLinkLocator[i];
            /* Flakey, have not found a reliable selector yet.
            try{
                await expect(webLink.thumbnail).toBeVisible();  
            }catch(erros){
                errors.push('Weblink has no thumbnail')
            }
            */ 
            count++;
            try{
                const url = webLinkURL[i]
                await this.checkNewPageWhenClickOnHyperLink(webLink.hyperlink, url);
                count < webLinkLocator.length ?
                await this.locator.nextNavgiationOnContentButton.click()
                : await expect(this.locator.nextNavgiationOnContentButton).toBeDisabled();
            } catch(error){
                errors.push('Hyperlink does not open');
            }
        }    
        return this;
    }
    async checkImageThumbnail(type: string, errors:string[]){
        let count = 0;
        try{
            if(type === 'image'){
                for(let i = 0; i<2; i++){
                    await expect(this.locator.imageThumbnail).toBeVisible();
                    count < 2 ? 
                    await this.locator.nextNavgiationOnContentButton.click()
                    : await expect(this.locator.nextNavgiationOnContentButton).toBeDisabled();
                }
            } else{
                await expect(this.locator.imageThumbnail).toBeVisible();
            }
        }catch(error){
            errors.push('No thumbnail for image')
        }
        return this;
    }
    async verifyMediaCardInformationContent(
        headline: string,
        title: string,
        description: string,
        errors : string[]
    ){
        try{
            await this.locator.DescriptionAfterSaved.scrollIntoViewIfNeeded();
            await expect.soft(this.locator.mediaCardTitleAfterSaved).toHaveText(title);
            await expect.soft(this.locator.headlineAfterSaved).toHaveText(headline);
            await expect.soft(this.locator.DescriptionAfterSaved).toHaveText(description);
        }catch(error){
            errors.push('Information is not visible')
        }
        return this;
    }
    async verifyQACardInformationContent(
        title: string,
        description: string,
        errors : string[]
    ){
        try{
            await this.locator.DescriptionAfterSaved.scrollIntoViewIfNeeded();
            await expect.soft(this.locator.QACardTitleAfterSaved).toHaveText(title);
            await expect.soft(this.locator.DescriptionAfterSaved).toHaveText(description);
        }catch(error){
            errors.push('Information is not visible')
        }
        return this;
    }
    async addEducationCard(){
        await this.locator.addContentButton.click();
        await this.locator.addEducationButton.click();
        await expect(this.locator.educationCardModal).toBeVisible();
        return this;
    }
    async checkIfFieldIsRequire(locator: Locator) {
        const inputElement = await locator.elementHandle();
        if (!inputElement) {
            throw new Error("Input element is null");
        }
        const tagName = await inputElement.evaluate((el) => el.tagName);
    
        if (tagName === 'INPUT') {
            // Check if input is required
            const isFieldValid = await inputElement.evaluate((el) => (el as HTMLInputElement).checkValidity());
            expect(isFieldValid).toBe(false);
        } else {
            console.warn(`Unexpected element tag: ${tagName}`);
        }
    }
    async selectInstitution(institute:string){
        await this.checkIfFieldIsRequire(this.locator.institutionInputField);
        await this.locator.institutionInputField.fill(institute);
        await this.selectDropdown(institute);
        await expect(this.locator.institutionInputField).toHaveAttribute('value', institute);
        return this;
    }
    async fillInstitutionURL(URL:string){
        await this.locator.instituationURLInputField.fill(URL);
        return this;
    }
    async selectQualification(qualification:string){
        await this.checkIfFieldIsRequire(this.locator.qualificationInputField);
        await this.locator.qualificationInputField.fill(qualification);
        await this.selectDropdown(qualification);
        await expect(this.locator.qualificationInputField).toHaveAttribute('value', qualification);
        return this;
    }
    async fillGrade(grade:string){
        await this.locator.gradeInputField.fill(grade);
        return this;
    }
    async fillFieldOfStudy(field:string){
        await this.locator.fieldOfStudyInputField.fill(field);
        return this;
    }
    async uploadSchoolOrWorkLogo(file:string, errors: string[]){
        const logo = path.join(__dirname, file);
        await this.locator.logoUploadInputField.setInputFiles(logo);
        
        try{
            await this.locator.UploadConfirmationModal.waitFor(
                {state:'visible'}
            )
            await this.locator.logoSaveButton.click(
                {timeout:5000}
            );
            await expect(this.locator.UploadConfirmationModal).not.toBeVisible();
        }catch(error){
            errors.push('No logo confirmation')
        }
        const imagePreview = await this.locator.logoUploadedField.getAttribute('src');
        expect(imagePreview).toMatch(/^data:image\//);
        return this;
    }
    async saveEducationCard(){
        await this.locator.workAndEducationSaveButton.click();
        await expect(this.locator.educationCardModal).not.toBeVisible(
            {timeout: 10000}
        )
    }
    async addWorkCard(){
        await this.locator.addContentButton.click();
        await this.locator.addWorkButton.click();
        await expect(this.locator.workCardModal).toBeVisible();
        return this;
    }
    async fillCompanyName(companyName: string){
        //await this.checkIfFieldIsRequire(this.locator.companyNameInputField);
        await this.locator.companyNameInputField.fill(companyName);
        return this;
    }
    async fillCompanyURL(companyURL:string){
        await this.locator.companyURLInputField.fill(companyURL);
        return this;
    }
    async fillCompanyTitle(title:string){
        //await this.checkIfFieldIsRequire(this.locator.companyTitleInputField);
        await this.locator.companyTitleInputField.fill(title);
        return this;
    }
    async fillCompanyLocation(location:string){
        await this.locator.companyLocationInputField.fill(location);
        return this;
    }
    async saveWorkCard(){
        await this.locator.workAndEducationSaveButton.click();
        await expect(this.locator.workCardModal).not.toBeVisible(
            {timeout:10000}
        )
        return this;
    }
    async verifyEducationCard(
        institute: string,
        qualification: string,
        grade: string,
        date: string
    ){
        const educationCard = await this.locator.educationCardContainer(
            institute,
            qualification
        );
        await expect(educationCard).toBeVisible();
        await expect.soft(educationCard).toContainText(institute);
        await expect.soft(educationCard).toContainText(grade);
        await expect.soft(educationCard).toContainText(qualification);
        await expect.soft(educationCard).toContainText(date);
        return this;
    }
    async verifyWorkCard(
        company: string,
        title: string,
        location: string,
        date: string,
    ){
        const workCard = await this.locator.workCardContainer(
            title,
            company
        );
        await expect(workCard).toBeVisible();
        await expect.soft(workCard).toContainText(company);
        await expect.soft(workCard).toContainText(title);
        await expect.soft(workCard).toContainText(location);
        await expect.soft(workCard).toContainText(date);
        return this;
    }
    async addSkillCard(){
        await this.locator.addContentButton.click();
        await this.locator.addSkillButton.click();
        await expect(this.locator.skillCardModal).toBeVisible();
        return this;
    }
    async addNewSkill(){
        const testData = DataManager.getInstance().getSkillCard()
        for(const data of testData){
            await this.locator.addSkill.fill(data.skill);
            const selectSkill = await this.locator.skillDropDown(data.skill);
            await selectSkill.waitFor({state:'visible'});
            await selectSkill.click();
            const skillChip = await this.locator.skillChipBeforeSave(data.skill);
            await expect(skillChip).toContainText(data.skill);
        }
        return this;
    }
    async saveSkillCard(){
        await this.locator.skillSaveButton.click();
        await expect(this.locator.skillCardModal).not.toBeVisible(
            {timeout: 10000}
        );
        return this;
    }
    async verifySkillCard(){
        const testData = DataManager.getInstance().getSkillCard();
        await this.locator.skillCardTitleAfterSaved.scrollIntoViewIfNeeded();
        const skillChip = await this.locator.allSkillChipAfterSaved.allTextContents();
        for(const data of testData){
            expect.soft(skillChip).toContain(data.skill);
        }
        return this;
    }
};

