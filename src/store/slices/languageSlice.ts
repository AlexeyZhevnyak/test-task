import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadStorageData, STORAGE_LANGUAGE_KEY} from 'src/utils/storage.ts';
import {Language} from '../../types/application';

interface LanguageState {
    language: Language;
}

const initialState: LanguageState = {
    language: loadStorageData(STORAGE_LANGUAGE_KEY, 'en')
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
