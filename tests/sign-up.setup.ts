import { test as setup} from "../base"
import { DataManager } from "../utils/data-manager";

setup('sign-up', async({
    vizzyLandingPage, 
    page,
    mailinatorPage,
    myProfilePage,
})=>{   
        const testUser = DataManager.getInstance().getSignUpUserData();
        const lastName = testUser.lastName;
        const email = testUser.email;
        const password = testUser.password;
        console.log(email);
        console.log(password);
        await vizzyLandingPage.launch(process.env.URL!)
        await vizzyLandingPage.allowAllCookie()
        await vizzyLandingPage.clickSignUpButton()
        await vizzyLandingPage.fillFirstName(testUser.firstName)
        await vizzyLandingPage.fillLastName(lastName);
        await vizzyLandingPage.fillEmail(email);
        await vizzyLandingPage.fillPassword(password);
        await vizzyLandingPage.clickRegisterButton()
        
        await mailinatorPage.launch(`https://www.mailinator.com/v4/public/inboxes.jsp?to=${email}`)
        await mailinatorPage.goIntoInbox()
        const verificationCode = await mailinatorPage.getVerificationCode()
        await vizzyLandingPage.fillVerificationCode(verificationCode)
        await vizzyLandingPage.continue()
        await myProfilePage.fillBespoken(testUser.firstName);
        await myProfilePage.verifyMyProfileTitle()
        await page.context().storageState({path: "storageState/sign-up.json"})
        await page.close();
})