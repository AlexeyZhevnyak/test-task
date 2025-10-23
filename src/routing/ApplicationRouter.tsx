import {CssBaseline} from '@mui/material';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import FamilyInfoForm from 'src/components/features/forms/FamilyInfoForm.tsx';
import PersonalInfoForm from 'src/components/features/forms/PersonalInfoForm.tsx';
import SituationForm from 'src/components/features/forms/SituationForm.tsx';
import SuccessCard from 'src/components/features/SuccessCard.tsx';
import {ProtectedRoute, ProtectedSuccessRoute} from 'src/components/ProtectedRoute.tsx';
import AppLayout from 'src/components/templates/AppLayout.tsx';

const ApplicationRouter = () =>
    <BrowserRouter>
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
                            <FamilyInfoForm/>
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
    </BrowserRouter>

export default ApplicationRouter;