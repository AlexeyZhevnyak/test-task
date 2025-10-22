import {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    CircularProgress,
    Alert,
    Box
} from '@mui/material';
import {useTranslation} from 'react-i18next';

export interface AiSuggestionDialogProps {
    open: boolean;
    suggestion: string;
    loading: boolean;
    error: string | null;
    onAccept: (text: string) => void;
    onDiscard: () => void;
    onClose: () => void;
}

const AiSuggestionDialog = ({
                                open,
                                suggestion,
                                loading,
                                error,
                                onAccept,
                                onDiscard,
                                onClose
                            }: AiSuggestionDialogProps) => {

    const {t} = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState('');

    const handleEdit = () => {
        setEditedText(suggestion);
        setIsEditing(true);
    };

    const handleAccept = () => {
        const textToAccept = isEditing ? editedText : suggestion;
        onAccept(textToAccept);
        setIsEditing(false);
        setEditedText('');
    };

    const handleDiscard = () => {
        setIsEditing(false);
        setEditedText('');
        onDiscard();
    };

    const handleClose = () => {
        setIsEditing(false);
        setEditedText('');
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            aria-labelledby="ai-suggestion-dialog-title"
        >
            <DialogTitle id="ai-suggestion-dialog-title">
                {t('ai.suggestionTitle')}
            </DialogTitle>

            <DialogContent>
                {loading && (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        py={4}
                    >
                        <CircularProgress size={48} sx={{mb: 2}}/>
                        <Box>{t('ai.generating')}</Box>
                    </Box>
                )}

                {error && (
                    <Alert severity="error" role="alert">
                        {t('ai.errorGeneration')}
                    </Alert>
                )}

                {!loading && !error && suggestion && (
                    <TextField
                        disabled={!isEditing}
                        fullWidth
                        multiline
                        rows={6}
                        value={isEditing ? editedText : suggestion}
                        {...(isEditing
                            ? {
                                onChange: (e) => setEditedText(e.target.value),
                            }
                            : {
                                slotProps: {
                                    input: {
                                        readOnly: true,
                                    },
                                },
                            })}
                        variant="outlined"
                        aria-label={t('ai.suggestionTitle')}
                    />
                )}
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleDiscard}
                    disabled={loading}
                    aria-label={t('ai.discard')}
                    variant="outlined"
                >
                    {t('ai.discard')}
                </Button>

                { !error && !isEditing && (
                    <Button
                        onClick={handleEdit}
                        variant="outlined"
                        aria-label={t('ai.edit')}
                        disabled={loading}
                    >
                        {t('ai.edit')}
                    </Button>
                )}

                {!error && (
                    <Button
                        onClick={handleAccept}
                        variant="contained"
                        color="primary"
                        aria-label={t('ai.accept')}
                        disabled={loading}
                    >
                        {t('ai.accept')}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AiSuggestionDialog;
