export const STORAGE_FORM_DATA_KEY = 'application_form_data';
export const STORAGE_COMPLETED_STEPS_KEY = 'application_completed_steps';
export const STORAGE_LANGUAGE_KEY = 'application_language';

export const clearFormData = (): void => {
    try {
        localStorage.removeItem(STORAGE_FORM_DATA_KEY);
        localStorage.removeItem(STORAGE_COMPLETED_STEPS_KEY);
    } catch (error) {
        console.error('Error clearing form data from localStorage:', error);
    }
};

export const loadStorageData = <T>(key: string, defaultValue: T): T => {
    try {
        const stored = localStorage.getItem(key);

        if (stored === null) {
            return defaultValue;
        }

        const parsed = JSON.parse(stored);
        return parsed as T;
    } catch {
        return defaultValue;
    }
}