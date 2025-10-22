import {Box, Step, StepLabel, Stepper} from '@mui/material';
import {useTranslation} from 'react-i18next';

export interface FormStepperProps {
    currentStep: number;
    steps?: string[];
}

const FormStepper = ({currentStep, steps}: FormStepperProps) => {
    const {t} = useTranslation();

    const defaultSteps = [
        t('steps.personal'),
        t('steps.family'),
        t('steps.situation')
    ];

    const stepLabels = steps || defaultSteps;

    return (
        <Box sx={{width: '100%', mb: 4}}>
            <Stepper
                activeStep={currentStep}
                alternativeLabel
                sx={{
                    '& .MuiStepLabel-label': {
                        mt: 1,
                        fontSize: {xs: '0.75rem', sm: '0.875rem'}
                    },
                    '& .MuiStepIcon-root': {
                        fontSize: {xs: '1.5rem', sm: '2rem'}
                    }
                }}
            >
                {stepLabels.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default FormStepper;
