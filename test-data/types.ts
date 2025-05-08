export interface TestData{
    user: User,
    dataForNormalCard: DataForNormalCard[],
    informationForCard: InformationForCard,
    psychAnswer : PsychAnswer[]
    informationForEducation : InformationForEducation,
    informationForWork : InformationForWork
    jobDetail: JobDetail,
    skillCard: SkillCard[],
    signUpUserData: SignUpUserData,
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

export interface InformationForCard{
    headline: string,
    startDate: string,
    endDate: string,
    description: string,
    question: string,
    prompt: string,
    companyName: string,
    companyURL: string,
    title: string,
    location: string,
    
    
}
export interface InformationForEducation{
    institute: string,
    instituteURL: string,
    qualification: string,
    grade: string, 
    fieldOfStudy: string,
    schoolLogo: string,
    startDate: string,
    endDate: string,
    description: string
}

export interface InformationForWork{
    company: string,
    companyURL: string,
    location: string,
    title: string, 
    workLogo: string,
    startDate: string,
    endDate: string,
    description: string
}

export interface PsychAnswer{
    page: number,
    answerIndex1 : number,
    answerIndex2 : number,
    ratingIndex1: number,
    ratingIndex2: number
}

export interface JobDetail{
    copy: string, 
    title: string,
    code: string,
    startDate: string,
    endDate: string,
    applicationType: string,
    description: string,
    requirement: string,
    employmentType : string,
    workModel: string,
    expectedStartDate: string,
    country: string,
    city: string,
    currency : string,
    salaryType: string,
    minSalary: string,
    maxSalary: string,
}

export interface SkillCard{
    skill: string
}

export interface SignUpUserData{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}


