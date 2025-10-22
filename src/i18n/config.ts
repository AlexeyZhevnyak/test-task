import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import arTranslations from './locales/ar.json';
import enTranslations from './locales/en.json';

const savedLanguage = localStorage.getItem('language') as 'en' | 'ar' | null;

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslations
            },
            ar: {
                translation: arTranslations
            }
        },
        lng: savedLanguage || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // React already escapes values
        }
    });

export default i18n;
