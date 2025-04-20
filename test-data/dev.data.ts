import { TestData} from "./types";

export const testData: TestData = {
    user: {
        firstName: "Trin",
        lastName: "Brewmen",
        email: "trinbrewmen@mailinator.com",
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
            requestURL: 'null'
        },
        {
            file : 'image' ,
            type : 'png',
            path : '../test-data/media/image/1.png',
            haveConfirmationModal: true,
            requestURL: 'null'
        },
        {
            file: 'gif',
            type: 'gif',
            path: '../test-data/media/image/2.gif',
            haveConfirmationModal: false,
            requestURL: 'https://a.klaviyo.com/client/events/?company_id=Vxik2W'
        },
        {
            file: 'document',
            type: 'pdf',
            path: '../test-data/media/pdf/0.pdf',
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
            requestURL: 'null'
        },
        {
            file: 'webLink',
            type: 'vimeo-video',
            path: 'https://vimeo.com/1073443416',
            haveConfirmationModal: false,
            requestURL: 'null'
        },
        {
            file: 'webLink',
            type: 'normal-weblink',
            path: 'https://www.nytimes.com/international/',
            haveConfirmationModal: false,
            requestURL: 'null'
        },
    ],
    informationForCard:{
        headline: 'Vizzy',
        startDate: '02/2005',
        endDate: '09/2022',
        description: 'I have nothing to show you all here',
        answer: 'This is an automation answers'
    }
}
