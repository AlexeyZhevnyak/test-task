import axios from 'axios';
import {useCallback, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {callAiAPI} from '../services/api';
import {useAppDispatch, useAppSelector} from '../store';
import {resetAiState, setAiError, setAiLoading, setAiSuggestion} from '../store/slices/aiSuggestionSlice';

export const useAiSuggestion = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {suggestion, loading, error} = useAppSelector((state) => state.ai);
    const abortControllerRef = useRef<AbortController | null>(null);

    const generateSuggestion = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();
        dispatch(setAiLoading(true));

        try {
            const prompt = t('ai.prompt');
            const aiModel = import.meta.env.VITE_API_MODEL
            const result = await callAiAPI(prompt, aiModel, abortControllerRef.current.signal);
            dispatch(setAiSuggestion(result));
        } catch (err) {
            if (axios.isCancel(err) || (err instanceof Error && err.name === 'CanceledError')) {
                dispatch(resetAiState());
                return;
            }
            const errorMessage = err instanceof Error ? err.message : 'Failed to generate suggestion';
            dispatch(setAiError(errorMessage));
        } finally {
            abortControllerRef.current = null;
        }
    }, [dispatch, t]);

    const cancelRequest = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    }, []);

    const resetSuggestion = useCallback(() => {
        cancelRequest();
        dispatch(resetAiState());
    }, [dispatch, cancelRequest]);

    return {
        suggestion,
        loading,
        error,
        generateSuggestion,
        resetSuggestion,
        cancelRequest
    };
};
