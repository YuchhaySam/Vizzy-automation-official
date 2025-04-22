export interface TestData{
    user: User,
    dataForNormalCard: DataForNormalCard[],
    informationForCard: informationForCard,
    psychAnswer : PsychAnswer[]
}

export interface User{
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    optInForNews?: boolean
    location: string,
    pronoun: string,
    headline: string,
    businessFacility: string,
    businessFacilityURL: string,
    bio: string,
    coverVideo: string
}

export interface DataForNormalCard{
    file: string,
    type: string,
    path: string,
    haveConfirmationModal: boolean,
    requestURL: string | null
}

export interface informationForCard{
    headline: string,
    startDate: string,
    endDate: string,
    description: string,
    question: string,
    prompt: string
}

export interface PsychAnswer{
    page: number,
    answerIndex1 : number,
    answerIndex2 : number,
    ratingIndex1: number,
    ratingIndex2: number
}


