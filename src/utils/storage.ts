import {ApplicationFormData} from '../types/application';

const STORAGE_KEY = 'application_form_data';
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
