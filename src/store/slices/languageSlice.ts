import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Language} from '../../types/application';

interface LanguageState {
    language: Language;
}

const loadLanguage = (): Language => {
    try {
        const stored = localStorage.getItem('language');
        return (stored as Language) || 'en';
    } catch {
        return 'en';
    }
};

const initialState: LanguageState = {
    language: loadLanguage()
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.language = action.payload;
        }
    }
});

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
