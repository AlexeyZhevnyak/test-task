import {ApplicationFormData} from '../types/application';

const STORAGE_KEY = 'application_form_data';

export const saveFormData = (data: Partial<ApplicationFormData>): void => {
    try {
        const existingData = loadFormData();
        const mergedData = {
            ...existingData,
            ...data
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedData));
    } catch (error) {
        console.error('Error saving form data to localStorage:', error);
    }
};

export const loadFormData = (): Partial<ApplicationFormData> => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error loading form data from localStorage:', error);
    }
    return {};
};

export const clearFormData = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('completedSteps');
    } catch (error) {
        console.error('Error clearing form data from localStorage:', error);
    }
};

export const saveLanguage = (language: 'en' | 'ar'): void => {
    try {
        localStorage.setItem('language', language);
    } catch (error) {
        console.error('Error saving language preference:', error);
    }
};

export const loadLanguage = (): 'en' | 'ar' => {
    try {
        const language = localStorage.getItem('language');
        return (language as 'en' | 'ar') || 'en';
    } catch (error) {
        console.error('Error loading language preference:', error);
        return 'en';
    }
};
