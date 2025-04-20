import { test, expect } from "@playwright/test";
import { DataManager } from "../utils/data-manager";
import { VizzyLandingPage } from "../pages/vizzy-landing-page.page";
import { MyProfilePage } from "../pages/my-profile.page";
import path from "path";

test.describe('free-user', async () => {
    let authState: {
        cookies: {
            name: string;
            value: string;
            domain: string;
            path: string;
            expires: number;
            httpOnly: boolean;
            secure: boolean;
            sameSite: "Strict" | "Lax" | "None";
        }[];
        origins: {
            origin: string;
            localStorage: {
                name: string;
                value: string;
            }[];
        }[];
    }; 

    test.beforeAll('login', async({browser})=>{
        const testUser = DataManager.getInstance().getUserData();
        const context = await browser.newContext();
        const vizzyPage = await context.newPage();
        await new VizzyLandingPage(vizzyPage)
            .launch()
            .then(landingPage => landingPage.allowAllCookie())
            .then(landingPage => landingPage.clickLoginButton())
            .then(landingPage => landingPage.fillEmail(testUser.email))
            .then(landingPage => landingPage.fillPassword(testUser.password))
            .then(landingPage => landingPage.signIn())
            .then(myProfilePage => myProfilePage.verifyMyProfileTitle());
        authState = await context.storageState();
        await context.close();
    });

    test.beforeEach('login', async({browser})=>{
        const context = await browser.newContext({storageState: authState});
        global.vizzyPage = await context.newPage();
        const vizzyLandingPage = new VizzyLandingPage(global.vizzyPage);
        await vizzyLandingPage.launch();
    });

    test.afterEach('close context', async()=>{
        await global.vizzyPage.close();
    });
    
    test.skip('add about you', async()=>{
        const testUser = DataManager.getInstance().getUserData();
        await new MyProfilePage(global.vizzyPage)
            .openBioEmptyState()
            .then(myProfilePage => myProfilePage.fillLocation(testUser.location))
            .then(myProfilePage => myProfilePage.selectDropdown(testUser.location))
            .then(myProfilePage => myProfilePage.clickOnPronounDropDown())
            .then(myProfilePage => myProfilePage.selectDropdown(testUser.pronoun))
            .then(myProfilePage => myProfilePage.fillHeadline(testUser.headline))
            .then(myProfilePage => myProfilePage.fillBusinessFacility(testUser.businessFacility))
            .then(myProfilePage => myProfilePage.fillBusinessFacilityURL(testUser.businessFacilityURL))
            .then(myProfilePage => myProfilePage.fillBio(testUser.bio))
            .then(myProfilePage => myProfilePage.clickSaveAndVerifyModal())
            .then(myProfilePage => myProfilePage.verifyAboutYouContents(
                testUser.pronoun, testUser.location, 
                testUser.bio, testUser.headline));
    });

    test.skip('upload profile', async()=>{
        const testUser = DataManager.getInstance().getUserData();
        const image1 = path.join(__dirname, '../test-data/media/image/0.jpg');
        const errors: string[] = [];
        await new MyProfilePage(global.vizzyPage)
            .openUploadProfileEmtpyState()
            .then(myProfilePage=> myProfilePage.uploadProfileImage(image1, errors))
            .then(myProfilePage => myProfilePage.fillCoverVideo(testUser.coverVideo))
            .then(myProfilePage => myProfilePage.clickSaveAndVerifyModal());
        expect(errors).toEqual([]);
        console.log(errors);
    });

    test.skip('upload project card with audio', async()=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await new MyProfilePage(global.vizzyPage)
            .addProjectCard()
            .then(myProfilePage => myProfilePage.addProjectHeadline(informationData.headline))
            .then(myProfilePage => myProfilePage.addStartDate(informationData.startDate))
            .then(myProfilePage => myProfilePage.addEndDate(informationData.endDate))
            .then(myProfilePage => myProfilePage.addDescription(informationData.description))
            .then(myProfilePage => myProfilePage.uploadMedia(errors, 'audio'))
            .then(myProfilePage => myProfilePage.countCarousel())
            .then(myProfilePage => myProfilePage.saveProjectCard())
            expect(errors).toEqual([]);
        console.log(errors);
    });
    
    test.skip('upload project card with image', async()=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await new MyProfilePage(global.vizzyPage)
            .addProjectCard()
            .then(myProfilePage => myProfilePage.addProjectHeadline(informationData.headline))
            .then(myProfilePage => myProfilePage.addStartDate(informationData.startDate))
            .then(myProfilePage => myProfilePage.addEndDate(informationData.endDate))
            .then(myProfilePage => myProfilePage.addDescription(informationData.description))
            .then(myProfilePage => myProfilePage.uploadMedia(errors, 'image'))
            .then(myProfilePage => myProfilePage.countCarousel())
            .then(myProfilePage => myProfilePage.saveProjectCard())
            expect(errors).toEqual([]);
        console.log(errors);
    });

    test.skip('upload project card with pdf', async()=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await new MyProfilePage(global.vizzyPage)
            .addProjectCard()
            .then(myProfilePage => myProfilePage.addProjectHeadline(informationData.headline))
            .then(myProfilePage => myProfilePage.addStartDate(informationData.startDate))
            .then(myProfilePage => myProfilePage.addEndDate(informationData.endDate))
            .then(myProfilePage => myProfilePage.addDescription(informationData.description))
            .then(myProfilePage => myProfilePage.uploadMedia(errors, 'document'))
            .then(myProfilePage => myProfilePage.countCarousel())
            .then(myProfilePage => myProfilePage.saveProjectCard())
            expect(errors).toEqual([]);
        console.log(errors);
    });

    test.skip('upload project card with webLink', async()=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await new MyProfilePage(global.vizzyPage)
            .addProjectCard()
            .then(myProfilePage => myProfilePage.addProjectHeadline(informationData.headline))
            .then(myProfilePage => myProfilePage.addStartDate(informationData.startDate))
            .then(myProfilePage => myProfilePage.addEndDate(informationData.endDate))
            .then(myProfilePage => myProfilePage.addDescription(informationData.description))
            .then(myProfilePage => myProfilePage.uploadMedia(errors, 'webLink'))
            .then(myProfilePage => myProfilePage.countCarousel())
            .then(myProfilePage => myProfilePage.saveProjectCard())
            expect(errors).toEqual([]);
        console.log(errors);
    });

    test.skip('upload project card with gif', async()=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await new MyProfilePage(global.vizzyPage)
            .addProjectCard()
            .then(myProfilePage => myProfilePage.addProjectHeadline(informationData.headline))
            .then(myProfilePage => myProfilePage.addStartDate(informationData.startDate))
            .then(myProfilePage => myProfilePage.addEndDate(informationData.endDate))
            .then(myProfilePage => myProfilePage.addDescription(informationData.description))
            .then(myProfilePage => myProfilePage.uploadMedia(errors, 'gif'))
            .then(myProfilePage => myProfilePage.countCarousel())
            .then(myProfilePage => myProfilePage.saveProjectCard())
            expect(errors).toEqual([]);
        console.log(errors);
    });

    test('add media card with audio', async()=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await new MyProfilePage(global.vizzyPage)
            .addMediaCard()
            .then(myProfilePage => myProfilePage.selectVizzyPrompt('A great read'))
            .then(myProfilePage => myProfilePage.addMediaCardHeadline(informationData.headline))
            .then(myProfilePage => myProfilePage.addDescription(informationData.description))
            .then(myProfilePage => myProfilePage.uploadMedia(errors, 'audio'))
            .then(myProfilePage => myProfilePage.countCarousel())
            .then(myProfilePage => myProfilePage.saveMediaCard());
    })


    test('add media card with image', async()=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await new MyProfilePage(global.vizzyPage)
            .addMediaCard()
            .then(myProfilePage => myProfilePage.selectVizzyPrompt('A great read'))
            .then(myProfilePage => myProfilePage.addMediaCardHeadline(informationData.headline))
            .then(myProfilePage => myProfilePage.addDescription(informationData.description))
            .then(myProfilePage => myProfilePage.uploadMedia(errors, 'image'))
            .then(myProfilePage => myProfilePage.countCarousel())
            .then(myProfilePage => myProfilePage.saveMediaCard());
    })

    test('add media card with pdf', async()=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await new MyProfilePage(global.vizzyPage)
            .addMediaCard()
            .then(myProfilePage => myProfilePage.selectVizzyPrompt('A great read'))
            .then(myProfilePage => myProfilePage.addMediaCardHeadline(informationData.headline))
            .then(myProfilePage => myProfilePage.addDescription(informationData.description))
            .then(myProfilePage => myProfilePage.uploadMedia(errors, 'document'))
            .then(myProfilePage => myProfilePage.countCarousel())
            .then(myProfilePage => myProfilePage.saveMediaCard());
    })
    
    test('add media card with webLink', async()=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await new MyProfilePage(global.vizzyPage)
            .addMediaCard()
            .then(myProfilePage => myProfilePage.selectVizzyPrompt('A great read'))
            .then(myProfilePage => myProfilePage.addMediaCardHeadline(informationData.headline))
            .then(myProfilePage => myProfilePage.addDescription(informationData.description))
            .then(myProfilePage => myProfilePage.uploadMedia(errors, 'webLink'))
            .then(myProfilePage => myProfilePage.countCarousel())
            .then(myProfilePage => myProfilePage.saveMediaCard());
    })

    test('add media card with gif', async()=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await new MyProfilePage(global.vizzyPage)
            .addMediaCard()
            .then(myProfilePage => myProfilePage.selectVizzyPrompt('A great read'))
            .then(myProfilePage => myProfilePage.addMediaCardHeadline(informationData.headline))
            .then(myProfilePage => myProfilePage.addDescription(informationData.description))
            .then(myProfilePage => myProfilePage.uploadMedia(errors, 'gif'))
            .then(myProfilePage => myProfilePage.countCarousel())
            .then(myProfilePage => myProfilePage.saveMediaCard());
    })
});
