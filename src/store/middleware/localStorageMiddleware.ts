import {Middleware} from '@reduxjs/toolkit';

const FORM_DATA_KEY = 'application_form_data';

const localStorageMiddleware: Middleware = (store) => (next) => (action: any) => {
    const result = next(action);
    const state = store.getState();

    if (action.type && action.type.startsWith('formValidation/')) {
        const {completedSteps} = state.formValidation;
        localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
    }

    if (action.type === 'language/setLanguage') {
        const {language} = state.language;
        localStorage.setItem('language', language);
    }

    if (action.type === 'formValidation/resetValidation') {
        localStorage.removeItem('completedSteps');
    }

    if (action.type && action.type.startsWith('formData/')) {
        const {formData} = state.formData;
        try {
            localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
        } catch (error) {
            console.error('Error saving form data to localStorage:', error);
        }
    }

    if (action.type === 'formData/resetFormData') {
        try {
            localStorage.removeItem(FORM_DATA_KEY);
        } catch (error) {
            console.error('Error clearing form data from localStorage:', error);
        }
    }

    return result;
};

export default localStorageMiddleware;
