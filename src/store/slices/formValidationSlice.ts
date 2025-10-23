import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadStorageData, STORAGE_COMPLETED_STEPS_KEY} from 'src/utils/storage.ts';

interface FormValidationState {
    completedSteps: number[];
    isStepValid: boolean;
    isSubmitting: boolean;
    isSubmitted: boolean;
    referenceNumber: string | null;
    error: string | null;
}

const initialState: FormValidationState = {
    completedSteps: loadStorageData(STORAGE_COMPLETED_STEPS_KEY, []),
    isStepValid: false,
    isSubmitting: false,
    isSubmitted: false,
    referenceNumber: null,
    error: null
};

const formValidationSlice = createSlice({
    name: 'formValidation',
    initialState,
    reducers: {
        markStepCompleted: (state, action: PayloadAction<number>) => {
            if (!state.completedSteps.includes(action.payload)) {
                state.completedSteps.push(action.payload);
            }
        },
        markStepIncomplete: (state, action: PayloadAction<number>) => {
            state.completedSteps = state.completedSteps.filter(step => step !== action.payload);
        },
        setStepValid: (state, action: PayloadAction<boolean>) => {
            state.isStepValid = action.payload;
        },
        setSubmitting: (state, action: PayloadAction<boolean>) => {
            state.isSubmitting = action.payload;
        },
        setSubmitted: (state, action: PayloadAction<{ referenceNumber: string }>) => {
            state.isSubmitted = true;
            state.referenceNumber = action.payload.referenceNumber;
            state.isSubmitting = false;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isSubmitting = false;
        },
        resetValidation: (state) => {
            state.completedSteps = [];
            state.isSubmitted = false;
            state.referenceNumber = null;
            state.error = null;
            state.isStepValid = false;
        }
    }
});

export const {
    markStepCompleted,
    markStepIncomplete,
    setStepValid,
    setSubmitting,
    setSubmitted,
    setError,
    resetValidation
} = formValidationSlice.actions;

export default formValidationSlice.reducer;
