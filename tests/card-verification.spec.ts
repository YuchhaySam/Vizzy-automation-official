import {test, expect} from "../base";
import { DataManager } from "../utils/data-manager";
import path from "path";
import { convertDateFormat } from "../utils/convertDate";

test.describe('Bio testing', async () => {

    test.beforeEach('login', async({vizzyLandingPage})=>{
        vizzyLandingPage.launch(process.env.URL!);
    });

    test.afterEach('close context', async({page})=>{
        await page.close();
    });
    
    test('add about you @bio', async({myProfilePage})=>{
        const testUser = DataManager.getInstance().getUserData();
        await myProfilePage.openBioEmptyState();
        await myProfilePage.fillLocation(testUser.location);
        await myProfilePage.selectDropdown(testUser.location);
        await myProfilePage.clickOnPronounDropDown();
        await myProfilePage.selectDropdown(testUser.pronoun);
        await myProfilePage.fillHeadline(testUser.headline);
        await myProfilePage.fillBusinessFacility(testUser.businessFacility);
        await myProfilePage.fillBusinessFacilityURL(testUser.businessFacilityURL);
        await myProfilePage.fillBio(testUser.bio);
        await myProfilePage.clickSaveAndVerifyModal();
        await myProfilePage.verifyAboutYouContents(
                testUser.pronoun, 
                testUser.location, 
                testUser.bio, 
                testUser.headline);
    });

    test('upload profile @bio', async({myProfilePage})=>{
        const testUser = DataManager.getInstance().getUserData();
        const image1 = path.join(__dirname, '../test-data/media/image/0.jpg');
        const errors: string[] = [];
        await myProfilePage.openUploadProfileEmtpyState()
        await myProfilePage.uploadProfileImage(image1, errors)
        await myProfilePage.fillCoverVideo(testUser.coverVideo)
        await myProfilePage.clickSaveAndVerifyModal();
        expect.soft(errors).toEqual([]);
        console.log(errors);
    });
});

test.describe('Project card', async()=>{
    test.beforeEach('login', async({vizzyLandingPage})=>{
        vizzyLandingPage.launch(process.env.URL!);
    });

    test.afterEach('close context', async({page})=>{
        await page.close();
    });

    test('upload project card with audio @project', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addProjectCard()
        await myProfilePage.addProjectHeadline(informationData.headline)
        await myProfilePage.addStartDate(informationData.startDate)
        await myProfilePage.addEndDate(informationData.endDate)
        await myProfilePage.addDescription(informationData.description)
        await myProfilePage.uploadMedia(errors, 'audio')
        await myProfilePage.countCarousel()
        await myProfilePage.saveProjectCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    });

    test('verify audio project card after saved @project', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyProjectCardInformationContent(
            informationData.headline,
            `${convertDateFormat(informationData.startDate)} – ${convertDateFormat(informationData.endDate)}`,
            informationData.description,
            errors
        )
        await myProfilePage.checkAudioThumbnail(errors)
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('upload project card with image @project', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addProjectCard()
        await myProfilePage.addProjectHeadline(informationData.headline)
        await myProfilePage.addStartDate(informationData.startDate)
        await myProfilePage.addEndDate(informationData.endDate)
        await myProfilePage.addDescription(informationData.description)
        await myProfilePage.uploadMedia(errors, 'image')
        await myProfilePage.countCarousel()
        await myProfilePage.saveProjectCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    });

    test('verify image project card after saved @project', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyProjectCardInformationContent(
            informationData.headline,
            `${convertDateFormat(informationData.startDate)} – ${convertDateFormat(informationData.endDate)}`,
            informationData.description,
            errors
        )
        //.then(myProfilePage => myProfilePage.checkImageThumbnail('image')) not working
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })

    test('upload project card with pdf @project', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addProjectCard()
        await myProfilePage.addProjectHeadline(informationData.headline)
        await myProfilePage.addStartDate(informationData.startDate)
        await myProfilePage.addEndDate(informationData.endDate)
        await myProfilePage.addDescription(informationData.description)
        await myProfilePage.uploadMedia(errors, 'document')
        await myProfilePage.countCarousel()
        await myProfilePage.saveProjectCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    });

    test('verify pdf project card after saved @project', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyProjectCardInformationContent(
            informationData.headline,
            `${convertDateFormat(informationData.startDate)} – ${convertDateFormat(informationData.endDate)}`,
            informationData.description,
            errors
        )
        await myProfilePage.checkPdfThumbnail(errors)
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })

    test('upload project card with webLink @project', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addProjectCard()
        await myProfilePage.addProjectHeadline(informationData.headline)
        await myProfilePage.addStartDate(informationData.startDate)
        await myProfilePage.addEndDate(informationData.endDate)
        await myProfilePage.addDescription(informationData.description)
        await myProfilePage.uploadMedia(errors, 'webLink')
        await myProfilePage.countCarousel()
        await myProfilePage.saveProjectCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    });

    test('verify weblink project card after saved @project', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyProjectCardInformationContent(
            informationData.headline,
            `${convertDateFormat(informationData.startDate)} – ${convertDateFormat(informationData.endDate)}`,
            informationData.description,
            errors
        )
        await myProfilePage.checkWebLinkThumbnail(errors)
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })

    test('upload project card with gif @project', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addProjectCard()
        await myProfilePage.addProjectHeadline(informationData.headline)
        await myProfilePage.addStartDate(informationData.startDate)
        await myProfilePage.addEndDate(informationData.endDate)
        await myProfilePage.addDescription(informationData.description)
        await myProfilePage.uploadMedia(errors, 'gif')
        await myProfilePage.countCarousel()
        await myProfilePage.saveProjectCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    });

    test('verify gif project card after saved @project', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyProjectCardInformationContent(
            informationData.headline,
            `${convertDateFormat(informationData.startDate)} – ${convertDateFormat(informationData.endDate)}`,
            informationData.description,
            errors
        )
        //.then(myProfilePage => myProfilePage.checkImageThumbnail('gif')) error
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
})

test.describe('Media card', async()=>{

    test.beforeEach('login', async({vizzyLandingPage})=>{
        vizzyLandingPage.launch(process.env.URL!);
    });

    test.afterEach('close context', async({page})=>{
        await page.close();
    });

    test('add media card with audio @media', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        console.log(informationData.prompt)
        await myProfilePage.addMediaCard()
        await myProfilePage.selectVizzyPrompt(informationData.prompt)
        await myProfilePage.addMediaCardHeadline(informationData.headline)
        await myProfilePage.addDescription(informationData.description)
        await  myProfilePage.uploadMedia(errors, 'audio')
        await myProfilePage.countCarousel()
        await myProfilePage.saveMediaCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('verify audio media card after saved @media', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyMediaCardInformationContent(
            informationData.headline,
            informationData.prompt,
            informationData.description,
            errors
        )
        await myProfilePage.checkAudioThumbnail(errors)
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('add media card with image @media', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addMediaCard()
        await myProfilePage.selectVizzyPrompt(informationData.prompt)
        await myProfilePage.addMediaCardHeadline(informationData.headline)
        await myProfilePage.addDescription(informationData.description)
        await myProfilePage.uploadMedia(errors, 'image')
        await myProfilePage.countCarousel()
        await myProfilePage.saveMediaCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('verify image media card after saved @media', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyMediaCardInformationContent(
            informationData.headline,
            informationData.prompt,
            informationData.description,
            errors
        )
        //.then(myProfilePage => myProfilePage.checkImageThumbnail('image', errors))
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('add media card with pdf @media', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addMediaCard()
        await myProfilePage.selectVizzyPrompt(informationData.prompt)
        await myProfilePage.addMediaCardHeadline(informationData.headline)
        await myProfilePage.addDescription(informationData.description)
        await myProfilePage.uploadMedia(errors, 'document')
        await myProfilePage.countCarousel()
        await myProfilePage.saveMediaCard()
            expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('verify pdf media card after saved @media', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyMediaCardInformationContent(
            informationData.headline,
            informationData.prompt,
            informationData.description,
            errors
        )
        await myProfilePage.checkPdfThumbnail(errors)
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('add media card with webLink @media', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addMediaCard()
        await myProfilePage.selectVizzyPrompt(informationData.prompt)
        await myProfilePage.addMediaCardHeadline(informationData.headline)
        await myProfilePage.addDescription(informationData.description)
        await myProfilePage.uploadMedia(errors, 'webLink')
        await myProfilePage.countCarousel()
        await myProfilePage.saveMediaCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('verify webLink media card after saved @media', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyMediaCardInformationContent(
            informationData.headline,
            informationData.prompt,
            informationData.description,
            errors
        )
        await myProfilePage.checkWebLinkThumbnail(errors)
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('add media card with gif @media', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addMediaCard()
        await myProfilePage.selectVizzyPrompt(informationData.prompt)
        await myProfilePage.addMediaCardHeadline(informationData.headline)
        await myProfilePage.addDescription(informationData.description)
        await myProfilePage.uploadMedia(errors, 'gif')
        await myProfilePage.countCarousel()
        await myProfilePage.saveMediaCard()
            expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('verify gif media card after saved @media', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyMediaCardInformationContent(
            informationData.headline,
            informationData.prompt,
            informationData.description,
            errors
        )
        //.then(myProfilePage => myProfilePage.checkImageThumbnail(errors))
        await myProfilePage.deleteCard();
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
})

test.describe('QA card', async()=>{

    test.beforeEach('login', async({vizzyLandingPage})=>{
        vizzyLandingPage.launch(process.env.URL!);
    });

    test.afterEach('close context', async({page})=>{
        await page.close();
    });

    test('add QA card with image @QA', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addQACard()
        await myProfilePage.selectQAQuestion(informationData.question)
        await myProfilePage.answeringQA(informationData.description)
        await myProfilePage.uploadMedia(errors, 'image')
        await myProfilePage.countCarousel()
        await myProfilePage.saveQACard()
            expect.soft(errors).toEqual([]);
        console.log(errors);
    });
    
    test('verify image QA card after saved @QA', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyQACardInformationContent(
            informationData.question,
            informationData.description,
            errors
        )
        //.then(myProfilePage => myProfilePage.checkImageThumbnail(errors))
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('add QA card with audio @QA', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addQACard()
        await myProfilePage.selectQAQuestion(informationData.question)
        await myProfilePage.answeringQA(informationData.description)
        await myProfilePage.uploadMedia(errors, 'audio')
        await myProfilePage.countCarousel()
        await myProfilePage.saveQACard()
        expect.soft(errors).toEqual([])
        console.log(errors);
    });
    
    test('verify audio QA card after saved @QA', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyQACardInformationContent(
            informationData.question,
            informationData.description,
            errors
        )
        await myProfilePage.checkAudioThumbnail(errors)
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('add QA card with pdf @QA', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addQACard()
        await myProfilePage.selectQAQuestion(informationData.question)
        await myProfilePage.answeringQA(informationData.description)
        await myProfilePage.uploadMedia(errors, 'document')
        await myProfilePage.countCarousel()
        await myProfilePage.saveQACard()
            expect.soft(errors).toEqual([]);
        console.log(errors);
    });
    
    test('verify pdf QA card after saved @QA', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyQACardInformationContent(
            informationData.question,
            informationData.description,
            errors
        )
        await myProfilePage.checkPdfThumbnail(errors)
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('add QA card with webLink @QA', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addQACard()
        await myProfilePage.selectQAQuestion(informationData.question)
        await myProfilePage.answeringQA(informationData.description)
        await myProfilePage.uploadMedia(errors, 'webLink')
        await myProfilePage.countCarousel()
        await myProfilePage.saveQACard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    });
    
    test('verify webLink QA card after saved @QA', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage
        .verifyQACardInformationContent(
            informationData.question,
            informationData.description,
            errors
        )
        await myProfilePage.checkWebLinkThumbnail(errors)
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
    
    test('add QA card with gif @QA', async({myProfilePage})=>{
        const errors : string[] = [];
        const informationData = DataManager.getInstance().getInformationForCard();
        await myProfilePage.addQACard()
        await myProfilePage.selectQAQuestion(informationData.question)
        await myProfilePage.answeringQA(informationData.description)
        await myProfilePage.uploadMedia(errors, 'gif')
        await myProfilePage.countCarousel()
        await myProfilePage.saveQACard()
            expect.soft(errors).toEqual([]);
        console.log(errors);
    });
    
    test('verify gif QA card after saved @QA', async({myProfilePage})=>{
        const informationData = DataManager.getInstance().getInformationForCard();
        const errors : string[] = [];
        await myProfilePage.verifyQACardInformationContent(
            informationData.question,
            informationData.description,
            errors
        )
        //.then(myProfilePage => myProfilePage.checkImageThumbnail(errors))
        await myProfilePage.deleteCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    })
});

test.describe('Psychometric card', async()=>{

    test.beforeEach('login', async({vizzyLandingPage})=>{
        vizzyLandingPage.launch(process.env.URL!);
    });

    test.afterEach('close context', async({page})=>{
        await page.close();
    });

    test('add Psych card @psych', async({myProfilePage})=>{
        await myProfilePage.addPsychCard()
        await myProfilePage.clickOnTakeTest()
        await myProfilePage.answerAndRatePsych()
        await myProfilePage.verifyPsychCard()
    })
    
    test('retake psych test @psych', async({
        myProfilePage,
        settingPage
    })=>{
        await settingPage.clickOnSettingIcon()
        await settingPage.clickOnRetakeTest()
        await myProfilePage.clickOnTakeTest()
        await myProfilePage.answerAndRatePsych()
        await myProfilePage.clickOnMyProfileIcon()
        await myProfilePage.verifyPsychCard()
    })   

});

test.describe('education', async()=>{

    test.beforeEach('login', async({vizzyLandingPage})=>{
        vizzyLandingPage.launch(process.env.URL!);
    });

    test.afterEach('close context', async({page})=>{
        await page.close();
    });
    test('add education card', async({myProfilePage})=>{
        const testData = DataManager.getInstance().getEducationCard();
        const errors : string[] = [];
        await myProfilePage.addEducationCard()
        await myProfilePage.selectInstitution(testData.institute)
        await myProfilePage.fillInstitutionURL(testData.instituteURL)
        await myProfilePage.selectQualification(testData.qualification)
        await myProfilePage.fillGrade(testData.grade)
        await myProfilePage.fillFieldOfStudy(testData.fieldOfStudy)
        await myProfilePage.addStartDate(testData.startDate)
        await myProfilePage.addEndDate(testData.endDate)
        await myProfilePage.addDescription(testData.description)
        await myProfilePage.uploadSchoolOrWorkLogo(
                testData.schoolLogo, 
                errors)
        await myProfilePage.saveEducationCard()
        expect.soft(errors).toEqual([]);
        console.log(errors);
    });
    test('verify education', async({myProfilePage})=>{
        const testData = DataManager.getInstance().getEducationCard();
        await myProfilePage.verifyEducationCard(
                testData.institute,
                testData.qualification,
                testData.grade,
                `${convertDateFormat(testData.startDate)} –  
                ${convertDateFormat(testData.endDate)}`
            );
    })
});

test.describe('Work card', async()=>{

    test.beforeEach('login', async({vizzyLandingPage})=>{
        vizzyLandingPage.launch(process.env.URL!);
    });

    test.afterEach('close context', async({page})=>{
        await page.close();
    });

    test('add work card', async({myProfilePage})=>{
        const testData = DataManager.getInstance().getWorkCard();
        const errors : string[] = [];
        await myProfilePage.addWorkCard()
        await myProfilePage.fillCompanyName(testData.company)
        await myProfilePage.fillCompanyURL(testData.companyURL)
        await myProfilePage.fillCompanyLocation(testData.location)
        await myProfilePage.fillCompanyTitle(testData.title)
        await myProfilePage.addStartDate(testData.startDate)
        await myProfilePage.addEndDate(testData.endDate)
        await myProfilePage.addDescription(testData.description)
        await myProfilePage.uploadSchoolOrWorkLogo(
                testData.workLogo, 
                errors)
        await myProfilePage.saveWorkCard()
        expect(errors).toEqual([]);
        console.log(errors);
    })
    test('verify work', async({myProfilePage})=>{
        const testData = DataManager.getInstance().getWorkCard();
        await myProfilePage.verifyWorkCard(
                testData.company,
                testData.title,
                testData.location,
                `${convertDateFormat(testData.startDate)} –  
                ${convertDateFormat(testData.endDate)}`
            );
    })
})

test.describe('Skill card', async()=>{

    test.beforeEach('login', async({vizzyLandingPage})=>{
        vizzyLandingPage.launch(process.env.URL!);
    });

    test.afterEach('close context', async({page})=>{
        await page.close();
    });

    test.only('add skill card', async({myProfilePage})=>{
        await myProfilePage.addSkillCard()
        await myProfilePage.addNewSkill();
        await myProfilePage.saveSkillCard();
    })

    test.only('verify skill card', async({myProfilePage})=>{
        await myProfilePage.verifySkillCard();
    })
})