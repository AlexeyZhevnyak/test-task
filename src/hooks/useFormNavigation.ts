import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store';
import {useLocation, useNavigate} from 'react-router-dom';
import {submitApplication} from '../services/api';
import {markStepCompleted, setError, setSubmitted, setSubmitting, setStepValid} from '../store/slices/formValidationSlice';

const getStepFromPath = (pathname: string): number => {
    if (pathname.includes('/personal')) return 0;
    if (pathname.includes('/family')) return 1;
    if (pathname.includes('/situation')) return 2;
    return 0;
};

const getPathFromStep = (step: number): string => {
    const paths = ['/personal', '/family', '/situation'];
    return paths[step] || '/personal';
};

export const useFormNavigation = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const formData = useAppSelector((state) => state.formData.formData);
    const {isSubmitting, error, completedSteps, isStepValid} = useAppSelector(
        (state) => state.formValidation
    );

    const currentStep = getStepFromPath(location.pathname);

    const onValidation = useCallback((isValid: boolean) => {
        dispatch(setStepValid(isValid));
    }, [dispatch]);

    useEffect(() => {
        if (isStepValid && !completedSteps.includes(currentStep)) {
            dispatch(markStepCompleted(currentStep));
        }
    }, [isStepValid, currentStep, completedSteps, dispatch]);

    const handleNext = useCallback(() => {
        if (currentStep < 2) {
            const nextPath = getPathFromStep(currentStep + 1);
            navigate(nextPath, {replace: true});
            dispatch(setStepValid(false));
        }
    }, [currentStep, navigate, dispatch]);

    const handleBack = useCallback(() => {
        if (currentStep > 0) {
            const prevPath = getPathFromStep(currentStep - 1);
            navigate(prevPath, {replace: true});
            dispatch(setStepValid(false));
        }
    }, [currentStep, navigate, dispatch]);

    const handleSubmit = useCallback(async () => {
        try {
            dispatch(setSubmitting(true));
            const response = await submitApplication(formData);
            dispatch(setSubmitted({referenceNumber: response.referenceNumber || ''}));
            navigate('/success', {replace: true});
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Submission failed'));
        }
    }, [dispatch, formData, navigate]);

    return {
        currentStep,
        isStepValid,
        isSubmitting,
        error,
        onValidation,
        handleNext,
        handleBack,
        handleSubmit
    };
};
