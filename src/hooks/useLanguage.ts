import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../store';
import {setLanguage} from '../store/slices/languageSlice';
import {Language} from '../types/application';

export const useLanguage = () => {
    const {i18n} = useTranslation();
    const dispatch = useAppDispatch();
    const currentLanguage = useAppSelector((state) => state.language.language);

    const handleLanguageChange = useCallback((language: Language) => {
        i18n.changeLanguage(language);
        dispatch(setLanguage(language));
        document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    }, [i18n, dispatch]);

    return {
        currentLanguage,
        handleLanguageChange
    };
};
