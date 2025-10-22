import {AutoAwesome} from '@mui/icons-material';
import {Box, Button, Grid, Typography} from '@mui/material';
import {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from 'src/store';
import FormTextArea from 'src/components/controls/FormTextArea.tsx';
import AiSuggestionDialog from 'src/components/features/AiSuggestionDialog.tsx';
import {useAiSuggestion} from 'src/hooks/useAiSuggestion';
import {useFormNavigation} from 'src/hooks/useFormNavigation';

import {updateSituationInfo} from 'src/store/slices/formDataSlice';
import {SituationDescriptions} from 'src/types/application.ts';

const SituationForm = () => {
    const {onValidation} = useFormNavigation();
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const situationData = useAppSelector((state) => state.formData.formData.situation);

    const {
        control,
        formState: {isValid},
        setValue
    } = useForm<SituationDescriptions>({
        mode: 'onChange',
        defaultValues: situationData
    });

    const {suggestion, loading, error, generateSuggestion, resetSuggestion} = useAiSuggestion();

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleFieldChange = useCallback((field: keyof SituationDescriptions, value: any) => {
        dispatch(updateSituationInfo({[field]: value}));
    }, [dispatch]);

    useEffect(() => {
        onValidation(isValid);
    }, [isValid, onValidation]);

    const handleAiButtonClick = useCallback(async () => {
        setDialogOpen(true);
        await generateSuggestion();
    }, [generateSuggestion]);

    const handleAcceptSuggestion = useCallback((text: string) => {
        setValue('reasonForApplying', text, {shouldValidate: true});
        dispatch(updateSituationInfo({reasonForApplying: text}));
        setDialogOpen(false);
        resetSuggestion();
    }, [setValue, dispatch, resetSuggestion]);

    const handleDiscardSuggestion = useCallback(() => {
        setDialogOpen(false);
        resetSuggestion();
    }, [resetSuggestion]);

    const handleCloseDialog = useCallback(() => {
        setDialogOpen(false);
    }, []);

    return (
        <Box>
            <Typography variant="h6" gutterBottom sx={{mb: {xs: 2, sm: 3}, fontWeight: 500}}>
                {t('steps.situation')}
            </Typography>

            <Grid container spacing={{xs: 2, sm: 2.5, md: 3}}>
                <Grid size={12}>
                    <FormTextArea
                        name="currentFinancialSituation"
                        control={control}
                        label={t('situation.currentFinancialSituation')}
                        rules={{
                            required: t('validation.required'),
                            maxLength: {
                                value: 2000,
                                message: t('validation.maxLength', {count: 2000})
                            }
                        }}
                        helperText={t('situation.currentFinancialSituationHelper')}
                        required
                        rows={4}
                        maxLength={2000}
                        onChange={(value) => handleFieldChange('currentFinancialSituation', value)}
                    />
                </Grid>

                <Grid size={12}>
                    <FormTextArea
                        name="employmentCircumstances"
                        control={control}
                        label={t('situation.employmentCircumstances')}
                        rules={{
                            required: t('validation.required'),
                            maxLength: {
                                value: 2000,
                                message: t('validation.maxLength', {count: 2000})
                            }
                        }}
                        helperText={t('situation.employmentCircumstancesHelper')}
                        required
                        rows={4}
                        maxLength={2000}
                        onChange={(value) => handleFieldChange('employmentCircumstances', value)}
                    />
                </Grid>

                <Grid size={12}>
                    <FormTextArea
                        name="reasonForApplying"
                        control={control}
                        label={t('situation.reasonForApplying')}
                        rules={{
                            required: t('validation.required'),
                            maxLength: {
                                value: 2000,
                                message: t('validation.maxLength', {count: 2000})
                            }
                        }}
                        helperText={t('situation.reasonForApplyingHelper')}
                        required
                        rows={4}
                        maxLength={2000}
                        onChange={(value) => handleFieldChange('reasonForApplying', value)}
                    />
                    <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            variant="outlined"
                            startIcon={<AutoAwesome/>}
                            onClick={handleAiButtonClick}
                            size="medium"
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                px: 2
                            }}
                            aria-label={t('ai.helpMeWrite')}
                        >
                            {t('ai.helpMeWrite')}
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <AiSuggestionDialog
                open={dialogOpen}
                suggestion={suggestion}
                loading={loading}
                error={error}
                onAccept={handleAcceptSuggestion}
                onDiscard={handleDiscardSuggestion}
                onClose={handleCloseDialog}
            />
        </Box>
    );
};

export default SituationForm;
