import {test as base} from '@playwright/test';
import { VizzyLandingPage } from './pages/vizzy-landing-page.page';
import { MyProfilePage } from './pages/my-profile.page';
import { SettingPage } from './pages/setting.page';
import { CreateManageJobPage } from './pages/createManageJob.page';
import { MailinatorPage } from './pages/mailinator.page';

type MyFixture = {
    vizzyLandingPage : VizzyLandingPage,
    myProfilePage : MyProfilePage,
    settingPage : SettingPage
    createManageJobPage : CreateManageJobPage
    mailinatorPage : MailinatorPage
}

export const test = base.extend<MyFixture>({
    vizzyLandingPage : async({page}, use)=>{
        await use(new VizzyLandingPage(page))
    },
    myProfilePage : async({page}, use)=>{
        await use(new MyProfilePage(page))
    },
    settingPage : async({page}, use)=>{
        await use(new SettingPage(page))
    },
    createManageJobPage : async({page}, use)=>{
        await use(new CreateManageJobPage(page))
    },
    mailinatorPage: async ({ browser }, use) => {
        const mailPage = await browser.newPage();
        await use(new MailinatorPage(mailPage));
    }

})

export {expect} from '@playwright/test'