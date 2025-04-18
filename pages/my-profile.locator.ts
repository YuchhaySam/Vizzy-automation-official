import {type Page} from '@playwright/test';

export class myProfileLocator{
    constructor(readonly page: Page){}
    
    get bioButton(){
        return this.page.getByRole('button', { name: 'Bio' });
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
        return this.page.getByRole('button', { name: 'Image' });
    }
    get profilePictureUploadField(){
        return this.page.locator('div')
            .filter({ hasText: /^1x1 \(Square\) recommended Max 10MB$/ })
            .locator('div')
    }
    get covervideoInputField(){
        return this.page.getByRole('textbox', { name: 'Bring your profile to life' });
    }
    get profileUploadConfirmationModal(){
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
};
