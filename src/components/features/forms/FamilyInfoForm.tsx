import {Box, Grid, Typography} from '@mui/material';
import {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from 'src/store';
import FormField from 'src/components/controls/FormField.tsx';


import FormSelect from "src/components/controls/FormSelect.tsx";
import {useFormNavigation} from 'src/hooks/useFormNavigation';

import {updateFamilyInfo} from 'src/store/slices/formDataSlice';
import {FamilyFinancialInfo} from 'src/types/application.ts';

const FamilyInfoForm = () => {
    const {onValidation} = useFormNavigation();
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const familyData = useAppSelector((state) => state.formData.formData.family);

    const {
        control,
        formState: {isValid}
    } = useForm<FamilyFinancialInfo>({
        mode: 'onChange',
        defaultValues: familyData
    });

    const handleFieldChange = useCallback((field: keyof FamilyFinancialInfo, value: any) => {
        dispatch(updateFamilyInfo({[field]: value}));
    }, [dispatch]);

    useEffect(() => {
        onValidation(isValid);
    }, [isValid, onValidation]);

    const maritalStatusOptions = [
        {value: 'single', label: t('family.maritalSingle')},
        {value: 'married', label: t('family.maritalMarried')},
        {value: 'divorced', label: t('family.maritalDivorced')},
        {value: 'widowed', label: t('family.maritalWidowed')}
    ];

    const employmentStatusOptions = [
        {value: 'employed', label: t('family.employmentEmployed')},
        {value: 'unemployed', label: t('family.employmentUnemployed')},
        {value: 'self-employed', label: t('family.employmentSelfEmployed')},
        {value: 'retired', label: t('family.employmentRetired')}
    ];

    const housingStatusOptions = [
        {value: 'owned', label: t('family.housingOwned')},
        {value: 'rented', label: t('family.housingRented')},
        {value: 'with-family', label: t('family.housingWithFamily')},
        {value: 'homeless', label: t('family.housingHomeless')}
    ];

    return (
        <Box>
            <Typography variant="h6" gutterBottom sx={{mb: {xs: 2, sm: 3}, fontWeight: 500}}>
                {t('steps.family')}
            </Typography>

            <Grid container spacing={{xs: 2, sm: 2.5, md: 3}}>
                <Grid size={{xs: 12, sm: 6}}>
                    <FormSelect
                        name="maritalStatus"
                        control={control}
                        label={t('family.maritalStatus')}
                        options={maritalStatusOptions}
                        rules={{required: t('validation.required')}}
                        required
                        onChange={(value) => handleFieldChange('maritalStatus', value)}
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 6}}>
                    <FormField
                        name="dependents"
                        control={control}
                        label={t('family.dependents')}
                        type="number"
                        rules={{
                            required: t('validation.required'),
                            min: {
                                value: 0,
                                message: t('validation.minValue', {min: 0})
                            }
                        }}
                        helperText={t('family.dependentsHelper')}
                        required
                        onChange={(value) => handleFieldChange('dependents', parseInt(value) || 0)}
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 6}}>
                    <FormSelect
                        name="employmentStatus"
                        control={control}
                        label={t('family.employmentStatus')}
                        options={employmentStatusOptions}
                        rules={{required: t('validation.required')}}
                        required
                        onChange={(value) => handleFieldChange('employmentStatus', value)}
                    />
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <FormField
                        name="monthlyIncome"
                        control={control}
                        label={t('family.monthlyIncome')}
                        rules={{
                            required: t('validation.required'),
                            pattern: {
                                value: /^[1-9][0-9]*$/,
                                message: 'Input a correct number'
                            },
                            min: {
                                value: 0,
                                message: t('validation.minValue', {min: 0})
                            }
                        }}
                        helperText={t('family.monthlyIncomeHelper')}
                        required
                        onChange={(value) => handleFieldChange('monthlyIncome', parseFloat(value) || 0)}
                    />
                </Grid>

                <Grid size={12}>
                    <FormSelect
                        name="housingStatus"
                        control={control}
                        label={t('family.housingStatus')}
                        options={housingStatusOptions}
                        rules={{required: t('validation.required')}}
                        required
                        onChange={(value) => handleFieldChange('housingStatus', value)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default FamilyInfoForm;
