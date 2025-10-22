import {Box, Container, Paper} from '@mui/material';
import {ReactNode} from 'react';
import {useLocation} from 'react-router-dom';
import LanguageToggle from 'src/components/controls/LanguageToggle';
import AppFooter from 'src/components/features/AppFooter';
import AppHeader from 'src/components/features/AppHeader';
import FormNavigationLayout from 'src/components/templates/FormNavigationLayout';
import {useFormNavigation} from 'src/hooks/useFormNavigation';
import {useLanguage} from 'src/hooks/useLanguage';

export interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout = ({children}: AppLayoutProps) => {
    const location = useLocation();
    const {currentLanguage, handleLanguageChange} = useLanguage();

    const isFormRoute = location.pathname === '/personal' ||
        location.pathname === '/family' ||
        location.pathname === '/situation';

    const {
        isStepValid,
        isSubmitting,
        error,
        handleNext,
        handleBack,
        handleSubmit
    } = useFormNavigation();


    const content = isFormRoute
        ? (
            <>
                <AppHeader/>
                <FormNavigationLayout
                    isStepValid={isStepValid}
                    isSubmitting={isSubmitting}
                    error={error}
                    onBack={handleBack}
                    onNext={handleNext}
                    onSubmit={handleSubmit}
                >
                    {children}
                </FormNavigationLayout>
            </>
        )
        : children;

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                py: {xs: 2, sm: 4, md: 6},
                ...(location.pathname === '/success' && {
                    display: 'flex',
                    flexDirection: 'column'
                })
            }}
        >
            <Container
                maxWidth="md"
                sx={location.pathname === '/success' ? {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                } : undefined}
            >
                <LanguageToggle
                    currentLanguage={currentLanguage}
                    onLanguageChange={handleLanguageChange}
                />

                <Paper
                    elevation={2}
                    sx={{
                        mb: 3,
                        ...(isFormRoute
                            ? {p: {xs: 2, sm: 3, md: 4}}
                            : {
                                p: {xs: 3, sm: 4, md: 6},
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            })
                    }}
                >
                    {content}
                </Paper>

                <AppFooter/>
            </Container>
        </Box>
    );
};

export default AppLayout;
