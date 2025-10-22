import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../store';
import {useTranslation} from 'react-i18next';
import {callZAPI} from '../services/api';
import {setAiLoading, setAiSuggestion, setAiError, resetAiState} from '../store/slices/aiSuggestionSlice';

export const useAiSuggestion = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {suggestion, loading, error} = useAppSelector((state) => state.ai);

    const generateSuggestion = useCallback(async () => {
        dispatch(setAiLoading(true));

        try {
            const prompt = t('ai.prompt');
            const result = await callZAPI(prompt);
            dispatch(setAiSuggestion(result));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to generate suggestion';
            dispatch(setAiError(errorMessage));
        }
    }, [dispatch, t]);

    const resetSuggestion = useCallback(() => {
        dispatch(resetAiState());
    }, [dispatch]);

    return {
        suggestion,
        loading,
        error,
        generateSuggestion,
        resetSuggestion
    };
};
