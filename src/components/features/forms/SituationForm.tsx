import {Box, Button, Grid, Typography} from '@mui/material';
import {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import FormTextArea from 'src/components/controls/FormTextArea.tsx';
import AiSuggestionDialog from 'src/components/features/AiSuggestionDialog.tsx';
import {useAiSuggestion} from 'src/hooks/useAiSuggestion';
import {useFormNavigation} from 'src/hooks/useFormNavigation';
import {useAppDispatch, useAppSelector} from 'src/store';

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

    const {suggestion, loading, error, generateSuggestion, resetSuggestion, cancelRequest} = useAiSuggestion();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [activeField, setActiveField] = useState<keyof SituationDescriptions | null>(null);

    const handleFieldChange = useCallback((field: keyof SituationDescriptions, value: any) => {
        dispatch(updateSituationInfo({[field]: value}));
    }, [dispatch]);

    useEffect(() => {
        onValidation(isValid);
    }, [isValid, onValidation]);

    const handleAiButtonClick = useCallback(async (field: keyof SituationDescriptions) => {
        setActiveField(field);
        setDialogOpen(true);
        await generateSuggestion();
    }, [generateSuggestion]);

    const handleAcceptSuggestion = useCallback((text: string) => {
        if (activeField) {
            setValue(activeField, text, {shouldValidate: true});
            dispatch(updateSituationInfo({[activeField]: text}));
        }
        setDialogOpen(false);
        resetSuggestion();
        setActiveField(null);
    }, [activeField, setValue, dispatch, resetSuggestion]);

    const handleDiscardSuggestion = useCallback(() => {
        cancelRequest();
        setDialogOpen(false);
        resetSuggestion();
        setActiveField(null);
    }, [cancelRequest, resetSuggestion]);

    const handleCloseDialog = useCallback(() => {
        cancelRequest();
        setDialogOpen(false);
        resetSuggestion();
        setActiveField(null);
    }, [cancelRequest, resetSuggestion]);

    const AiHelpButton = () => <Button
        variant="outlined"
        onClick={() => handleAiButtonClick('currentFinancialSituation')}
        aria-label={t('ai.helpMeWrite')}
        sx={{
            fontSize: '0.75rem',
            textTransform: 'none',
            minWidth: 'auto',
            padding: '2px 8px'
        }}
    >
        {t('ai.helpMeWrite')}
    </Button>

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
                        showCharacterCount
                        aiButton={
                            <AiHelpButton/>
                        }
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
                        showCharacterCount
                        aiButton={
                            <AiHelpButton/>
                        }
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
                        showCharacterCount
                        aiButton={
                            <AiHelpButton/>
                        }
                    />
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
