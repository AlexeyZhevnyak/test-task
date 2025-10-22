import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AiSuggestionState {
    suggestion: string;
    loading: boolean;
    error: string | null;
}

const initialState: AiSuggestionState = {
    suggestion: '',
    loading: false,
    error: null
};

const aiSuggestionSlice = createSlice({
    name: 'ai',
    initialState,
    reducers: {
        setAiLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setAiSuggestion: (state, action: PayloadAction<string>) => {
            state.suggestion = action.payload;
            state.loading = false;
            state.error = null;
        },
        setAiError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        resetAiState: (state) => {
            state.suggestion = '';
            state.loading = false;
            state.error = null;
        }
    }
});

export const {
    setAiLoading,
    setAiSuggestion,
    setAiError,
    resetAiState
} = aiSuggestionSlice.actions;

export default aiSuggestionSlice.reducer;
