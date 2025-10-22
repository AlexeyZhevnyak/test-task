import {Box, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';

const AppFooter = () => {
    const {t} = useTranslation();

    return (
        <Box sx={{textAlign: 'center', mt: 2}}>
            <Typography variant="body2" color="text.secondary">
                {new Date().getFullYear()} {t('app.title')}
            </Typography>
        </Box>
    );
};

export default AppFooter;
