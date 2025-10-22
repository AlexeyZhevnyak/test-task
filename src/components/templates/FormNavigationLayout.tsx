import {Alert, Box} from '@mui/material';
import {useLocation} from 'react-router-dom';
import FormStepper from 'src/components/features/FormStepper.tsx';
import NavigationControls from 'src/components/features/NavigationControls.tsx';

export interface FormNavigationLayoutProps {
    isStepValid: boolean;
    isSubmitting?: boolean;
    error?: string | null;
    children: React.ReactNode;
    onBack: () => void;
    onNext: () => void;
    onSubmit: () => void;
}

const getStepFromPath = (pathname: string): number => {
    if (pathname.includes('/personal')) return 0;
    if (pathname.includes('/family')) return 1;
    if (pathname.includes('/situation')) return 2;
    return 0;
};

const FormNavigationLayout = ({
                                  isStepValid,
                                  isSubmitting = false,
                                  error,
                                  children,
                                  onBack,
                                  onNext,
                                  onSubmit
                              }: FormNavigationLayoutProps) => {
    const location = useLocation();
    const currentStep = getStepFromPath(location.pathname);
    const totalSteps = 3;

    return (
        <Box>
            <FormStepper currentStep={currentStep}/>

            {error && (
                <Alert severity="error" sx={{mb: 3}} role="alert">
                    {error}
                </Alert>
            )}

            <Box sx={{mb: 4}}>{children}</Box>

            <NavigationControls
                currentStep={currentStep}
                totalSteps={totalSteps}
                isStepValid={isStepValid}
                isSubmitting={isSubmitting}
                onBack={onBack}
                onNext={onNext}
                onSubmit={onSubmit}
            />
        </Box>
    );
};

export default FormNavigationLayout;
