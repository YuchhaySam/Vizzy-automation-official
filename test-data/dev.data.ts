import { TestData} from "./types";

export const testData: TestData = {
    user: {
        firstName: "Ct",
        lastName: "bot",
        email: "ci_bot@mailinator.com",
        password: "Yuchhaysam123@",
        location: "London, UK",
        pronoun: "He / Him",
        headline: 'QA',
        businessFacility: "Vizzy",
        businessFacilityURL: "https://vizzy.com",
        bio: "I am a software engineer with 5 years of experience in web development. I love coding and learning new technologies.",
        coverVideo: 'https://www.youtube.com/watch?v=MYPVQccHhAQ',
    },
    dataForNormalCard :[
        {
            file : 'image' ,
            type : 'jpeg',
            path : '../test-data/media/image/0.jpg',
            haveConfirmationModal: true,
            requestURL: null
        },
        {
            file : 'image' ,
            type : 'png',
            path : '../test-data/media/image/1.png',
            haveConfirmationModal: true,
            requestURL: null
        },
        {
            file: 'gif',
            type: 'gif',
            path: '../test-data/media/image/2.gif',
            haveConfirmationModal: false,
            requestURL: null
        },
        {
            file: 'document',
            type: 'pdf',
            path: '../test-data/media/pdf/0.pdf',
            haveConfirmationModal: false,
            requestURL: 'v1_1/thinking-sky-blue-limited/image/upload'
        },
        {
            file: 'document',
            type: 'pdf',
            path: '../test-data/media/pdf/1.pdf',
            haveConfirmationModal: false,
            requestURL: 'v1_1/thinking-sky-blue-limited/image/upload'
        },
        {
            file: 'audio',
            type: 'mp3',
            path: '../test-data/media/audio/0.mp3',
            haveConfirmationModal: false,
            requestURL: 'v1_1/thinking-sky-blue-limited/video/upload'
        },
        {
            file: 'audio',
            type: 'wav',
            path: '../test-data/media/audio/1.wav',
            haveConfirmationModal: false,
            requestURL: 'v1_1/thinking-sky-blue-limited/video/upload'
        },
        {
            file: 'audio',
            type: 'ogg',
            path: '../test-data/media/audio/2.ogg',
            haveConfirmationModal: false,
            requestURL: 'v1_1/thinking-sky-blue-limited/video/upload'
        },
        {
            file: 'audio',
            type: 'm4a',
            path: '../test-data/media/audio/3.m4a',
            haveConfirmationModal: false,
            requestURL: 'v1_1/thinking-sky-blue-limited/video/upload'
        },
        {
            file: 'audio',
            type: 'wav',
            path: '../test-data/media/audio/4.flac',
            haveConfirmationModal: false,
            requestURL: 'v1_1/thinking-sky-blue-limited/video/upload'
        },
        {
            file: 'webLink',
            type: 'youtube-video',
            path: 'https://www.youtube.com/watch?v=NTpbbQUBbuo',
            haveConfirmationModal: false,
            requestURL: null
        },
        {
            file: 'webLink',
            type: 'vimeo-video',
            path: 'https://vimeo.com/1073443416',
            haveConfirmationModal: false,
            requestURL: null
        },
        {
            file: 'webLink',
            type: 'normal-weblink',
            path: 'https://www.nytimes.com/international/',
            haveConfirmationModal: false,
            requestURL: null
        },
    ],
    informationForCard:{
        headline: 'Vizzy',
        startDate: '02/2005',
        endDate: '09/2022',
        description: 'I have nothing to show you all here',
        question: `In the next three years, I'd like to…`,
        prompt: 'A great read'
    },
    psychAnswer : [
        { page: 1, answerIndex1: 0, answerIndex2: 2, ratingIndex1: 4, ratingIndex2: 7 },
        { page: 2, answerIndex1: 1, answerIndex2: 3, ratingIndex1: 0, ratingIndex2: 1 },
        { page: 3, answerIndex1: 0, answerIndex2: 1, ratingIndex1: 6, ratingIndex2: 5 },
        { page: 4, answerIndex1: 2, answerIndex2: 3, ratingIndex1: 2, ratingIndex2: 3 },
        { page: 5, answerIndex1: 0, answerIndex2: 3, ratingIndex1: 7, ratingIndex2: 0 },
        { page: 6, answerIndex1: 1, answerIndex2: 2, ratingIndex1: 5, ratingIndex2: 4 },
        { page: 7, answerIndex1: 0, answerIndex2: 1, ratingIndex1: 1, ratingIndex2: 6 },
        { page: 8, answerIndex1: 3, answerIndex2: 1, ratingIndex1: 0, ratingIndex2: 7 },
        { page: 9, answerIndex1: 0, answerIndex2: 2, ratingIndex1: 3, ratingIndex2: 2 },
        { page: 10, answerIndex1: 1, answerIndex2: 3, ratingIndex1: 4, ratingIndex2: 5 },
    ]
}
