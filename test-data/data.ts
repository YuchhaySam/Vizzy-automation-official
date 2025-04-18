import { env } from "../playwright.config";

export const getData = () => {
    return require(`./${env}.data.ts`).testData;
};
