import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Language} from '../../types/application';

interface LanguageState {
    language: Language;
}

const initialState: LanguageState = {
    language: (localStorage.getItem('language') as Language) || 'en'
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.language = action.payload;
            localStorage.setItem('language', action.payload);
        }
    }
});

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
