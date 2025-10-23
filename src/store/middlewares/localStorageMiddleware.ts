import {Middleware} from '@reduxjs/toolkit';
import {STORAGE_COMPLETED_STEPS_KEY, STORAGE_FORM_DATA_KEY, STORAGE_LANGUAGE_KEY} from 'src/utils/storage.ts';

const localStorageMiddleware: Middleware = (store) => (next) => (action: any) => {
    const result = next(action);
    const state = store.getState();

    if (action.type && action.type.startsWith('formValidation/')) {
        const {completedSteps} = state.formValidation;
        localStorage.setItem(STORAGE_COMPLETED_STEPS_KEY, JSON.stringify(completedSteps));
    }

    if (action.type === 'language/setLanguage') {
        const {language} = state.language;
        localStorage.setItem(STORAGE_LANGUAGE_KEY, language);
    }

    if (action.type === 'formValidation/resetValidation') {
        localStorage.removeItem(STORAGE_COMPLETED_STEPS_KEY);
    }

    if (action.type && action.type.startsWith('formData/')) {
        const {formData} = state.formData;
        try {
            localStorage.setItem(STORAGE_FORM_DATA_KEY, JSON.stringify(formData));
        } catch (error) {
            console.error('Error saving form data to localStorage:', error);
        }
    }

    if (action.type === 'formData/resetFormData') {
        try {
            localStorage.removeItem(STORAGE_FORM_DATA_KEY);
        } catch (error) {
            console.error('Error clearing form data from localStorage:', error);
        }
    }

    return result;
};

export default localStorageMiddleware;
