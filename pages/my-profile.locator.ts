import {type Page, Locator} from '@playwright/test';

export class myProfileLocator{
    constructor(readonly page: Page){}
    
    get bespokenInput(){
        return this.page.getByRole('textbox', { name: 'vizzy.com/@' });
    }
    get besopkenSaveButton(){
        return this.page.getByRole('button', { name: 'Next' });
    }
    get skipButton(){
        return this.page.getByRole('button', { name: 'Skip video' });
    }
    get bioButton(){
        return this.page.getByRole('button', { name: 'Add Bio' }).nth(1);
    }
    get locationInputField(){
        return this.page.getByRole('textbox', { name: 'Location(this field is' });
    }
    get DropdownList(){
        return `//ul[contains(@class,'Select_options__LlsWV')]/li`;
    }
    get headLineInputField(){
        return this.page.getByRole('textbox', { name: 'Headline Max 0 / 100' });
    }
    get businessFacilityInputField(){
        return this.page.getByRole('textbox', { name: 'Current business or faculty', exact: true });
    }
    get businessFacilityURL(){
        return this.page.getByRole('textbox', { name: 'Current business or faculty URL' });
    }
    get bioInputField(){
        return this.page.getByRole('paragraph').filter({ hasText: /^$/ }); 
    }
    get saveButton(){
        return this.page.getByRole('button', { name: 'Save' });
    }
    get bioCardModalString(){
        return `text="Bio cardProfile"`;
    }
    get bioCardModal(){
        return this.page.getByText('Bio cardProfile');
    }
    get pronounDropDownField(){
        return this.page.locator('span').filter({ hasText: 'Select' });
    }
    get aboutYouPronouns(){
        return this.page.locator(`//p[@class='CoverCard_pronoun__boraw']`)
    }
    get aboutYouHeadline(){
        return this.page.locator(`//p[@class='CoverCard_headline__DPVPv']`)
    }
    get aboutYouBLocation(){
        return this.page.locator(`//p[@class='CoverCard_location__L_Za8']`);
    }
    get aboutYouBio(){
        return this.page.locator(`div[role='textbox'] p`);
    }
    get bioImageButton(){
        return this.page.getByRole('button', { name: 'Add Bio' }).first();
    }
    get profilePictureUploadField(){
        return this.page.locator('div')
            .filter({ hasText: /^1x1 \(Square\) recommended Max 10MB$/ })
            .locator('div')
    }
    get covervideoInputField(){
        return this.page.getByRole('textbox', { name: 'Bring your profile to life' });
    }
    get UploadConfirmationModal(){
        return this.page.getByText('EditResetCancelSave');
    }
    get confirmationSaveButton(){
        return this.page.getByRole('button', { name: 'Save' }).nth(1);
    }
    get uploadedProfilePicture(){
        return this.page.getByRole('img', { name: 'Profile picture' });
    }
    get addContentButton(){
        return this.page.getByRole('button', { name: 'Content', exact: true });
    }
    get addEducationButton(){
        return this.page.getByRole('button', { name: 'Education Bring your' });
    }
    get addWorkButton(){
        return this.page.getByRole('button', { name: 'Work Showcase your work with' });
    }
    get addSkillButton(){
        return this.page.getByRole('button', { name: 'Skills Highlight all your' });
    }
    get addProjectButton(){
        return this.page.getByRole('button', { name: 'Project Share your projects' });
    }
    get addMediaButton(){
        return this.page.getByRole('button', { name: 'Media card Share your' });
    }
    get addQAButton(){
        return this.page.getByRole('button', { name: 'Q&A Answer the questions you\'' });
    }
    get addWebLinkInputField(){
        return this.page.getByRole('textbox', { name: 'Weblink' });
    }
    get addMediaInputField(){
        return this.page.locator(`//div[@role='button' and contains(@class, 'UploadCVModal_label__h_bEw')]//input[@type='file']`);
    }
    get addCardDescription(){
        return this.page.getByRole('paragraph').filter({ hasText: /^$/ }); 
    }
    get addStartDate(){
        return this.page.getByRole('textbox', { name: 'Start date(this field is' });
    }
    get addEndDate(){
        return this.page.getByRole('textbox', { name: 'End date (if applicable)' });
    }
    get addProjectHeadline(){
        return this.page.getByRole('textbox', { name: 'Project headline(this field' });
    }
    get carouselContainer(){
        return `//div[@class='Card_cardHeader__VU_0G Card_spaceBetween__lBzMe PreviewMultiMedia_cardHeader__rP6z6']`;
    }
    get projectModal(){
        return this.page.getByText('Add project cardShowcase your');
    }
    get fileNotSupportedError(){
        return this.page.getByText('File type is not supported').first();
    }
    get addWebLinkButton(){
        return this.page.getByRole('button', { name: 'Add a link' });
    }
    get noDataWeblinkError(){
        return this.page.getByText('No data available, please').first();
    }
    get mediaCardDropdownPrompt(){
        return `//ul[contains(@class,'FormFields_options__iEtje')]/li`;
    }
    get mediaCardModal(){
        return this.page.getByText('Add media cardShare your');
    }
    get mediaCardPromptContainer(){
        return this.page.getByRole('button', { name: 'Vizzy prompt' });
    }
    get mediaCardHeadline(){
        return this.page.getByRole('textbox', { name: 'Headline' });
    }
    get psychAnswer(){
        return this.page.locator(`//div[contains(@class,'QuestionnaireModal_statements__T7FJL')]/button`);
    }
    get QAQuestionsDropdownContainer(){
        return this.page.getByRole('button', { name: 'Question(this field is' });
    }
    get QAQuestionsDropdownSelection(){
        return this.page.locator(`//ul[contains(@class,'FormFields_options__iEtje')]/li`);
    }
    get QAModal(){
        return this.page.locator('#modal-lightbox div').filter({ hasText: 'Add Q&A cardShare your ideas' }).nth(1);
    }
    get addPsychometricButton(){
        return this.page.getByRole('button', { name: 'Add Psychometrics' });
    }
    get projectCardTitle(){
        return this.page.getByText('Add project card');
    }
    get mediaCardTitle(){
        return this.page.getByText('Add media card', { exact: true });
    }
    get QACardTitle(){
        return this.page.getByText('Add Q&A card');
    }
    get psychoCardTitle(){
        return this.page.getByRole('heading', { name: 'How does the psychometric' });
    }
    get takeTestButton(){
        return this.page.getByRole('button', { name: 'Take test' });
    }
    get ratingButton(){
        return this.page.locator(`//div[@class='QuestionnaireModal_rankings__7XZn4']/button`);
    }
    get psychModal(){
        return this.page.locator('#modal-lightbox');
    }
    get psychNextButton(){
        return this.page.getByText('Next');
    }
    get psychSubmitButton(){
        return this.page.getByRole('button', { name: 'Submit' });
    }
    get completePsychCard(){
        return this.page.locator(`//div[@class='Card_cardContent__fbo_R Card_adjustSpacing__x578E PsychometricCard_psychContainer__j7glO']`);
    }
    get myProfileIcon(){
        return this.page.getByRole('link', { name: 'My profile' });
    }
    get cardImagEditModal(){
        return this.page.getByText('EditResetFreeWidescreenPortraitClassicSquareCancelSave');
    }
    get projectCardTitleAfterSaved(){
        return this.page.locator('span').filter({ hasText: 'Project' }).first();
    }
    get headlineAfterSaved(){
        return this.page.locator('#content').getByText('Vizzy', { exact: true });
    }
    get projectCardDateAfterSaved(){
        return this.page.getByText('Feb 05 – Sep');
    }
    get DescriptionAfterSaved(){
        return this.page.getByText('I have nothing to show you');
    }
    get deleteCardButton(){
        return this.page.getByRole('button', { name: 'Remove' });
    }
    get contentNavigationContainer(){
        return this.page.locator('.Carousel_navigation__FjCPu');
    }
    get deleteCardModal(){
        return this.page.getByText('Delete cardAre you sure you');
    }
    get confirmToDeleteButton(){
        return this.page.getByRole('button', { name: 'Delete' });
    }
    get nextNavgiationOnContentButton(){
        return this.page.getByRole('button', { name: 'Next' });
    }
    get previousNavigationOnContentButton(){
        return this.page.getByRole('button', { name: 'Previous' });
    }
    get audioLocator(): {thumbnail: Locator; playButton: Locator}[]{
        return[
            {
                thumbnail: this.page.locator('.Media_coverAsset__xLOzW').first(),
                playButton: this.page.locator('.Media_iconView__yGPuM').first()
            },
            {
                thumbnail: this.page.locator('div:nth-child(2) > div > .Media_media__4HM3f > .Media_coverAsset__xLOzW'),
                playButton: this.page.locator('div:nth-child(2) > div > .Media_media__4HM3f > .Media_iconView__yGPuM')
            },
            {
                thumbnail: this.page.locator('div:nth-child(3) > div > .Media_media__4HM3f > .Media_coverAsset__xLOzW'),
                playButton: this.page.locator('div:nth-child(3) > div > .Media_media__4HM3f > .Media_iconView__yGPuM')
            },
            {
                thumbnail: this.page.locator('div:nth-child(4) > div > .Media_media__4HM3f > .Media_coverAsset__xLOzW'),
                playButton: this.page.locator('div:nth-child(4) > div > .Media_media__4HM3f > .Media_iconView__yGPuM')
            },
            {
                thumbnail: this.page.locator('div:nth-child(5) > div > .Media_media__4HM3f > .Media_coverAsset__xLOzW'),
                playButton: this.page.locator('div:nth-child(5) > div > .Media_media__4HM3f > .Media_iconView__yGPuM')
            },
        ]
    }
    get pdfLocator() : { thumbnail: Locator; button: Locator; modal: Locator}[]{
        return [
            {
                thumbnail: this.page.getByRole('button', { name: 'button' }).first(),
                button: this.page.getByRole('button', { name: 'button' }).nth(1),
                modal : this.page.locator('canvas')
            },
            {
                thumbnail:  this.page.getByRole('button', { name: 'button' }).nth(2),
                button: this.page.getByRole('button', { name: 'button' }).nth(3),
                modal: this.page.locator('canvas')
            }     
        ]
    }
    get webLink(): { thumbnail: Locator; hyperlink: Locator;}[]{
        return [
            {   
                thumbnail: this.page.getByRole('button', { name: 'button' }).nth(1),
                hyperlink: this.page.getByRole('link', { name: 'youtube.com - open in a new' }),
            },
            {
                thumbnail: this.page.getByRole('button', { name: 'button' }).nth(2),
                hyperlink:  this.page.getByRole('link', { name: 'vimeo.com - open in a new tab' }),
            },
            {
                thumbnail: this.page.getByRole('img', { name: 'nytimes.com' }),
                hyperlink: this.page.getByRole('link', { name: 'nytimes.com - open in a new' }),
            }              
        ]
    }
    get imageThumbnail(): {thumbnail: Locator}[]{
        return [
            {
                thumbnail: this.page.getByRole('img', { name: 'cards/'}).first()
            },
            {
                thumbnail: this.page.getByRole('img', { name: 'cards/'}).nth(1)
            }
        ]
    }
    get gifThumbnail(){
        return this.page.getByRole('img', { name: 'cards/' });
    }
    get audioPlayerModal(){
        return this.page.locator('#modal-lightbox div').nth(1);
    }
    get mediaCardTitleAfterSaved(){
        return this.page.getByText('A great read');
    }
    get QACardTitleAfterSaved(){
        return this.page.getByText('In the next three years, I\'d');
    }
    async educationCardContainer(
        institute: string,
        qualification: string
    ) {
        return this.page.locator('button').filter({ hasText: `${institute}${qualification}` });
    }
    get educationCardModal(){
        return this.page.getByText('Add educationUpload CV BetaGet all eyes on your qualifications.Institution *');
    }
    get institutionInputField(){
        return this.page.locator(`//input[@name='university']`);
    }
    get instituationURLInputField(){
        return this.page.getByRole('textbox', { name: 'Institution URL' });
    }
    get qualificationInputField(){
        return this.page.getByRole('textbox', { name: 'Qualification(this field is' });
    }
    get gradeInputField(){
        return this.page.getByRole('textbox', { name: 'Grade' });
    }
    get fieldOfStudyInputField(){
        return this.page.getByRole('textbox', { name: 'Field of study' });
    }
    get logoUploadInputField(){
        return this.page.locator(`//input[@name='logo']`);
    }
    get logoSaveButton(){
        return this.page.getByRole('button', { name: 'Save' }).nth(2);
    }
    get logoUploadedField(){
        return this.page.locator('#modal-lightbox img');
    }
    get workAndEducationSaveButton(){
        return this.page.getByRole('button', { name: 'Save', exact: true });
    }
    get companyNameInputField(){
        return this.page.getByRole('textbox', { name: 'Company name(this field is' });
    }
    get companyURLInputField(){
        return this.page.getByRole('textbox', { name: 'Company URL' });
    }
    get companyTitleInputField(){
        return this.page.getByRole('textbox', { name: 'Title(this field is required)' });
    }
    get companyLocationInputField(){
        return this.page.getByRole('textbox', { name: 'Location' });
    }
    get workCardModal(){
        return this.page.getByText('Add workUpload CV BetaShowcase your experience and projects in style.Company');
    }
    async workCardContainer(title: string, company: string){
        return this.page.locator('button').filter({ hasText: `${title}${company}` });
    }
    get addSkill(){
        return this.page.getByRole('textbox', { name: 'Add a new skill' });
    }
    async skillDropDown(skill:string){
        return this.page.getByRole("listitem").filter({ hasText: new RegExp(`^${skill}$`) })
    }
    async skillChipBeforeSave(skill:string){
        return this.page.getByText(skill);
    }
    get skillCardModal(){
        return this.page.getByText('SkillsAny software you\'re');
    }
    get skillSaveButton(){
        return this.page.getByRole('button', { name: 'Save' });
    }
    get allSkillChipAfterSaved(){
        return this.page.locator('div.Card_cardContent__fbo_R.Card_adjustSpacing__x578E.SkillsCard_pills__B8ltA span span');
    }
    get skillCardTitleAfterSaved(){
        return this.page.locator('#content').getByText('Skills');
    }
}
