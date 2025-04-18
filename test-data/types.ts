export interface TestData{
    user: User,
    dataForNormalCard: DataForNormalCard[],
    informationForCard: informationForCard
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
    haveConfirmationModal: boolean
}

export interface informationForCard{
    headline: string,
    startDate: string,
    endDate: string,
    description: string,
    answer: string
}


