import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Box, Divider, Paper, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'src/store';
import {resetFormData} from 'src/store/slices/formDataSlice';
import {resetValidation} from 'src/store/slices/formValidationSlice';
import {clearFormData} from 'src/utils/storage';

const SuccessCard = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const referenceNumber = useAppSelector((state) => state.formValidation.referenceNumber);

    const handleNewApplication = () => {
        clearFormData();
        dispatch(resetFormData());
        dispatch(resetValidation());
        navigate('/personal', {replace: true});
    };

    return (
        <Box
            sx={{
                textAlign: 'center',
                py: 4
            }}
            role="alert"
            aria-live="polite"
        >
            <CheckCircleIcon
                sx={{
                    fontSize: {xs: 60, sm: 80},
                    color: 'success.main',
                    mb: 2
                }}
                aria-hidden="true"
            />

            <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                    color: 'success.main',
                    fontWeight: 600,
                    fontSize: {xs: '1.5rem', sm: '2rem'}
                }}
            >
                {t('success.title')}
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{mb: 4, fontSize: {xs: '0.875rem', sm: '1rem'}}}
            >
                {t('success.message')}
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 4,
                    backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    border: '1px solid',
                    borderColor: 'success.main'
                }}
            >
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {t('success.referenceNumber')}
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        color: 'success.dark',
                        fontFamily: 'monospace',
                        letterSpacing: 1,
                        fontSize: {xs: '1.25rem', sm: '1.5rem'}
                    }}
                    component="p"
                    aria-label={`${t('success.referenceNumber')}: ${referenceNumber}`}
                >
                    {referenceNumber}
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{mt: 1, display: 'block'}}
                >
                    {t('success.keepReference')}
                </Typography>
            </Paper>

            <Divider sx={{mb: 3}}/>

            <Box sx={{mb: 4, textAlign: 'left'}}>
                <Typography variant="h6" gutterBottom sx={{fontWeight: 500}}>
                    {t('success.nextSteps')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t('success.nextStepsText')}
                </Typography>
            </Box>

            <Button
                variant="contained"
                size="large"
                onClick={handleNewApplication}
                sx={{
                    mt: 2,
                    px: 4
                }}
                aria-label={t('buttons.newApplication')}
            >
                {t('buttons.newApplication')}
            </Button>
        </Box>
    );
};

export default SuccessCard;
