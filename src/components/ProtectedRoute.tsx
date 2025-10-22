import {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../store';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredStep: number;
}

const ProtectedRoute = ({children, requiredStep}: ProtectedRouteProps) => {
    const {completedSteps} = useAppSelector((state) => state.formValidation);

    if (requiredStep === 0) {
        return <>{children}</>;
    }

    const previousStepsCompleted = Array.from({length: requiredStep}, (_, i) => i).every(
        step => completedSteps.includes(step)
    );

    if (!previousStepsCompleted) {
        const nextIncompleteStep = Array.from({length: requiredStep}, (_, i) => i).find(
            step => !completedSteps.includes(step)
        );

        const redirectPaths = ['/personal', '/family', '/situation'];
        return <Navigate to={redirectPaths[nextIncompleteStep ?? 0]} replace/>;
    }

    return <>{children}</>;
};

export const ProtectedSuccessRoute = ({children}: { children: ReactNode }) => {
    const isSubmitted = useAppSelector((state) => state.formValidation.isSubmitted);

    if (!isSubmitted) {
        return <Navigate to="/personal" replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
