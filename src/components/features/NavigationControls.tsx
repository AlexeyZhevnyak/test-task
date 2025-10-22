import {Box, CircularProgress} from '@mui/material';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';

export interface NavigationControlsProps {
    currentStep: number;
    totalSteps: number;
    isStepValid: boolean;
    isSubmitting?: boolean;
    onBack: () => void;
    onNext: () => void;
    onSubmit: () => void;
}

const NavigationControls = ({
                                currentStep,
                                totalSteps,
                                isStepValid,
                                isSubmitting = false,
                                onBack,
                                onNext,
                                onSubmit
                            }: NavigationControlsProps) => {
    const {t} = useTranslation();

    const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            action();
        }
    };

    const isLastStep = currentStep >= totalSteps - 1;
    const isFirstStep = currentStep === 0;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: {xs: 'column', sm: 'row'},
                gap: 2,
                pt: 3,
                borderTop: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Button
                variant="outlined"
                onClick={onBack}
                disabled={isFirstStep || isSubmitting}
                onKeyDown={(e) => handleKeyDown(e, onBack)}
                sx={{order: {xs: 2, sm: 1}}}
                aria-label={t('buttons.back')}
            >
                {t('buttons.back')}
            </Button>

            {!isLastStep ? (
                <Button
                    variant="contained"
                    onClick={onNext}
                    disabled={!isStepValid}
                    onKeyDown={(e) => handleKeyDown(e, onNext)}
                    sx={{order: {xs: 1, sm: 2}}}
                    aria-label={t('buttons.next')}
                >
                    {t('buttons.next')}
                </Button>
            ) : (
                <Button
                    variant="contained"
                    onClick={onSubmit}
                    disabled={!isStepValid || isSubmitting}
                    onKeyDown={(e) => handleKeyDown(e, onSubmit)}
                    sx={{order: {xs: 1, sm: 2}}}
                    aria-label={t('buttons.submit')}
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit"/> : null}
                >
                    {isSubmitting ? t('buttons.submit') + '...' : t('buttons.submit')}
                </Button>
            )}
        </Box>
    );
};

export default NavigationControls;
