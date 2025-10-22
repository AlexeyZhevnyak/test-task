import {Box, Grid, Typography,} from '@mui/material';
import {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from 'src/store';
import FormDatePicker from 'src/components/controls/FormDatePicker.tsx';

import FormField from 'src/components/controls/FormField.tsx';
import FormSelect from 'src/components/controls/FormSelect.tsx';
import {updatePersonalInfo} from 'src/store/slices/formDataSlice';
import {PersonalInformation} from 'src/types/application.ts';
import {useFormNavigation} from 'src/hooks/useFormNavigation';

const PersonalInfoForm = () => {
    const {onValidation} = useFormNavigation();
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const personalData = useAppSelector((state) => state.formData.formData.personal);

    const {
        control,
        formState: {isValid}
    } = useForm<PersonalInformation>({
        mode: 'onChange',
        defaultValues: personalData
    });

    const handleFieldChange = useCallback((field: keyof PersonalInformation, value: any) => {
        dispatch(updatePersonalInfo({[field]: value}));
    }, [dispatch]);

    useEffect(() => {
        onValidation(isValid);
    }, [isValid, onValidation]);

    const genderOptions = [
        {value: 'male', label: t('personal.genderMale')},
        {value: 'female', label: t('personal.genderFemale')},
    ];

    const validateUAEPhone = (value: string) => {
        const cleanNumber = value.replace(/[\s\-()]/g, '');


        const mobilePattern = /^(\+971|00971|971)?(50|52|54|55|56|58)\d{7}$/;

        const landlinePattern = /^(\+971|00971|971)?[2|4|6|7|9]\d{7}$/;

        const localMobilePattern = /^(050|052|054|055|056|058)\d{7}$/;
        const localLandlinePattern = /^0[2|4|6|7|9]\d{7}$/;

        const isValid = mobilePattern.test(cleanNumber) ||
            landlinePattern.test(cleanNumber) ||
            localMobilePattern.test(cleanNumber) ||
            localLandlinePattern.test(cleanNumber);

        return isValid || t('validation.invalidUAEPhone');
    };

    const validateUAENationalId = (value: string) => {
        const cleanId = value.replace(/[\s\-]/g, '');

        const uaeNationalIdPattern = /^784\d{12}$/;

        return uaeNationalIdPattern.test(cleanId) || t('validation.invalidUAENationalId');
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom sx={{mb: {xs: 2, sm: 3}, fontWeight: 500}}>
                {t('steps.personal')}
            </Typography>

            <Grid container spacing={{xs: 2, sm: 2.5, md: 3}}>
                <Grid size={12}>
                    <FormField
                        name="name"
                        control={control}
                        label={t('personal.name')}
                        rules={{
                            required: t('validation.required'),
                            minLength: {
                                value: 2,
                                message: t('validation.minLength', {count: 2})
                            }
                        }}
                        helperText={t('personal.nameHelper')}
                        required
                        onChange={(value) => handleFieldChange('name', value)}
                    />
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <FormField
                        name="nationalId"
                        control={control}
                        label={t('personal.nationalId')}
                        rules={{
                            required: t('validation.required'),
                            validate: validateUAENationalId
                        }}
                        helperText={t('personal.nationalIdHelper')}
                        required
                        onChange={(value) => handleFieldChange('nationalId', value)}
                    />
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <FormDatePicker
                        name="dateOfBirth"
                        control={control}
                        label={t('personal.dateOfBirth')}
                        rules={{
                            required: t('validation.required'),
                            validate: (value) => {
                                const date = new Date(value);
                                const age = (new Date().getTime() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
                                return age >= 18 || t('validation.mustBe18');
                            }
                        }}
                        required
                        maxDate={new Date().toISOString().split('T')[0]}
                        onChange={(value) => handleFieldChange('dateOfBirth', value)}
                    />
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <FormSelect
                        name="gender"
                        control={control}
                        label={t('personal.gender')}
                        options={genderOptions}
                        rules={{required: t('validation.required')}}
                        required
                        onChange={(value) => handleFieldChange('gender', value)}
                    />
                </Grid>

                <Grid size={12}>
                    <FormField
                        name="address"
                        control={control}
                        label={t('personal.address')}
                        rules={{
                            required: t('validation.required'),
                            minLength: {
                                value: 5,
                                message: t('validation.minLength', {count: 5})
                            }
                        }}
                        helperText={t('personal.addressHelper')}
                        required
                        onChange={(value) => handleFieldChange('address', value)}
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 6}}>
                    <FormField
                        name="city"
                        control={control}
                        label={t('personal.city')}
                        rules={{required: t('validation.required')}}
                        required
                        onChange={(value) => handleFieldChange('city', value)}
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 6}}>
                    <FormField
                        name="state"
                        control={control}
                        label={t('personal.state')}
                        rules={{required: t('validation.required')}}
                        required
                        onChange={(value) => handleFieldChange('state', value)}
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 6}}>
                    <FormField
                        name="country"
                        control={control}
                        label={t('personal.country')}
                        rules={{required: t('validation.required')}}
                        required
                        onChange={(value) => handleFieldChange('country', value)}
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 6}}>
                    <FormField
                        name="phone"
                        control={control}
                        label={t('personal.phone')}
                        type="tel"
                        rules={{
                            required: t('validation.required'),
                            validate: validateUAEPhone
                        }}
                        helperText="UAE: +971 X XXX XXXX or +971 5X XXX XXXX"
                        required
                        onChange={(value) => handleFieldChange('phone', value)}
                    />
                </Grid>

                <Grid size={12}>
                    <FormField
                        name="email"
                        control={control}
                        label={t('personal.email')}
                        type="email"
                        rules={{
                            required: t('validation.required'),
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: t('validation.invalidEmail')
                            }
                        }}
                        helperText={t('personal.emailHelper')}
                        required
                        onChange={(value) => handleFieldChange('email', value)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PersonalInfoForm;
