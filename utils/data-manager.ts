import { getData } from "../test-data/data";
import { TestData } from "../test-data/types";

export class DataManager {
    private static instance: DataManager;
    private testData: TestData = getData();

    private constructor() {}
    
    public static getInstance(): DataManager {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager();
        }
        return DataManager.instance;
    }
    
    public getUserData(){
        return this.testData.user;
    } 
    public getDataForNormalCard(){
        return this.testData.dataForNormalCard;
    }
    public getInformationForCard(){
        return this.testData.informationForCard;
    }
    public getPsychAnswer(){
        return this.testData.psychAnswer;
    }
}
