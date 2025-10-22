import createCache from '@emotion/cache';
import {CacheProvider} from "@emotion/react";
import {CssBaseline, ThemeProvider} from '@mui/material';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Provider} from 'react-redux';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import FamilyInfoForm from 'src/components/features/forms/FamilyInfoForm.tsx';
import PersonalInfoForm from 'src/components/features/forms/PersonalInfoForm.tsx';
import SituationForm from 'src/components/features/forms/SituationForm.tsx';

import {prefixer} from 'stylis';

import SuccessCard from './components/features/SuccessCard';
import ProtectedRoute, {ProtectedSuccessRoute} from './components/ProtectedRoute';
import AppLayout from './components/templates/AppLayout';
import {store} from './store';
import {createAppTheme} from './theme';
import './i18n/config';

const AppContent = () => {
    const {i18n} = useTranslation();
    const rtlCache = createCache({
        key: 'muirtl',
        stylisPlugins: i18n.language === 'ar' ? [prefixer, rtlPlugin] : [],
    });
    const theme = useMemo(
        () => {
            return createAppTheme(i18n.language === 'ar' ? 'rtl' : 'ltr')
        },
        [i18n.language]
    );

    useEffect(() => {
        document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);


    return (
        <CacheProvider value={rtlCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppLayout>
                    <Routes>
                        <Route path="/" element={<Navigate to="/personal" replace/>}/>

                        <Route
                            path="/personal"
                            element={
                                <ProtectedRoute requiredStep={0}>
                                    <PersonalInfoForm/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/family"
                            element={
                                <ProtectedRoute requiredStep={1}>
                                    <FamilyInfoForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/situation"
                            element={
                                <ProtectedRoute requiredStep={2}>
                                    <SituationForm/>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/success"
                            element={
                                <ProtectedSuccessRoute>
                                    <SuccessCard/>
                                </ProtectedSuccessRoute>
                            }
                        />

                        <Route path="*" element={<Navigate to="/personal" replace/>}/>
                    </Routes>
                </AppLayout>
            </ThemeProvider>
        </CacheProvider>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppContent/>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
