import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import formDataReducer from './slices/formDataSlice';
import formValidationReducer from './slices/formValidationSlice';
import aiSuggestionReducer from './slices/aiSuggestionSlice';
import languageReducer from './slices/languageSlice';

export const store = configureStore({
    reducer: {
        formData: formDataReducer,
        formValidation: formValidationReducer,
        ai: aiSuggestionReducer,
        language: languageReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
