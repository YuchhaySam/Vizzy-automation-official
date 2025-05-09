import {test, expect} from "../base";
import { DataManager } from "../utils/data-manager";
import { convertDateFormat } from "../utils/convertDate";


test.describe("Job with Pre-Requisite", () => {
    test.beforeEach('login', async({vizzyLandingPage})=>{
        vizzyLandingPage.launch(process.env.URL!);
    });

    test.afterEach('close context', async({page})=>{
        await page.close();
    });

    test('Create job', async({
        settingPage,
        createManageJobPage
    })=>{
        const jobData = DataManager.getInstance().getJobDetail();
        await settingPage.clickOnSettingIcon();
        await settingPage.clickOnCreateManageJob();
        await createManageJobPage.createNewJob(jobData.copy);
        await createManageJobPage.fillJobDetail(jobData);
        await createManageJobPage.saveJobDetail();
    });
});