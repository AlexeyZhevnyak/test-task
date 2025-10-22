export interface PersonalInformation {
    name: string;
    nationalId: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | '';
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
}

export interface FamilyFinancialInfo {
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | '';
    dependents: number;
    employmentStatus: 'employed' | 'unemployed' | 'self-employed' | 'retired' | '';
    monthlyIncome: number;
    housingStatus: 'owned' | 'rented' | 'with-family' | 'homeless' | '';
}

export interface SituationDescriptions {
    currentFinancialSituation: string;
    employmentCircumstances: string;
    reasonForApplying: string;
}

export interface ApplicationFormData {
    personal: PersonalInformation;
    family: FamilyFinancialInfo;
    situation: SituationDescriptions;
}

export interface ApplicationSubmissionResponse {
    success: boolean;
    referenceNumber?: string;
    message: string;
}

export interface ApplicationState {
    formData: ApplicationFormData;
    completedSteps: number[];
    isSubmitting: boolean;
    isSubmitted: boolean;
    referenceNumber: string | null;
    error: string | null;
}

export type Language = 'en' | 'ar';
