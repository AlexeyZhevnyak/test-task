import {Box, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';

const AppHeader = () => {
    const {t} = useTranslation();

    return (
        <Box sx={{textAlign: 'center', mb: 4}}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: {xs: '1.5rem', sm: '2rem'}
                }}
            >
                {t('app.title')}
            </Typography>
            <Typography
                variant="h6"
                component="h2"
                color="text.secondary"
                sx={{
                    fontSize: {xs: '1rem', sm: '1.25rem'}
                }}
            >
                {t('app.subtitle')}
            </Typography>
        </Box>
    );
};

export default AppHeader;
