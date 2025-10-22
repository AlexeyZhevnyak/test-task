import {Box, ToggleButton, ToggleButtonGroup} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {Language} from 'src/types/application.ts';

export interface LanguageToggleProps {
    currentLanguage: Language;
    onLanguageChange: (language: Language) => void;
}

const LanguageToggle = ({currentLanguage, onLanguageChange}: LanguageToggleProps) => {
    const {t} = useTranslation();

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newLanguage: Language | null
    ) => {
        if (newLanguage !== null) {
            onLanguageChange(newLanguage);
        }
    };

    return (
        <Box sx={{display: 'flex', justifyContent: 'flex-end', mb: 2}}>
            <ToggleButtonGroup
                value={currentLanguage}
                exclusive
                onChange={handleChange}
                aria-label="language selection"
                size="small"
                sx={{
                    backgroundColor: 'background.paper',
                    '& .MuiToggleButton-root': {
                        px: 2,
                        py: 0.5,
                        textTransform: 'none',
                        fontWeight: 500
                    }
                }}
            >
                <ToggleButton value="en" aria-label="English">
                    {t('language.english')}
                </ToggleButton>
                <ToggleButton value="ar" aria-label="Arabic">
                    {t('language.arabic')}
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default LanguageToggle;
