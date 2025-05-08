import { test as setup} from "@playwright/test";
import { DataManager } from "../utils/data-manager";
import { VizzyLandingPage } from "../pages/vizzy-landing-page.page";

setup('login', async({page})=>{
        const testUser = DataManager.getInstance().getUserData();
        await new VizzyLandingPage(page)
            .launch(process.env.URL!)
            .then(landingPage => landingPage.allowAllCookie())
            .then(landingPage => landingPage.clickLoginButton())
            .then(landingPage => landingPage.fillEmail(testUser.email))
            .then(landingPage => landingPage.fillPassword(testUser.password))
            .then(landingPage => landingPage.signIn())
            .then(myProfilePage => myProfilePage.verifyMyProfileTitle());
        await page.context().storageState({path: "storageState/login.json"})
});