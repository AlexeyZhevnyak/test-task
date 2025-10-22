import {Box, InputLabel, TextField} from '@mui/material';
import {Control, Controller, FieldValues, Path, RegisterOptions} from 'react-hook-form';
import {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

export interface FormTextAreaProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    rules?: RegisterOptions<T>;
    helperText?: string;
    required?: boolean;
    rows?: number;
    maxLength?: number;
    onChange?: (value: string) => void;
    aiButton?: ReactNode;
    showCharacterCount?: boolean;
}

const FormTextArea = <T extends FieldValues>({
                                                 name,
                                                 control,
                                                 label,
                                                 rules,
                                                 helperText,
                                                 required = false,
                                                 rows = 4,
                                                 maxLength,
                                                 onChange: externalOnChange,
                                                 aiButton,
                                                 showCharacterCount = false
                                             }: FormTextAreaProps<T>) => {
    const {t} = useTranslation();
    const fieldId = `textarea-${String(name)}`;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field, fieldState: {error}}) => {
                const currentLength = field.value?.length || 0;
                const characterCountText = showCharacterCount && maxLength
                    ? t('validation.characterCount', {current: currentLength, max: maxLength})
                    : '';
                const combinedHelperText = error?.message || [helperText, characterCountText].filter(Boolean).join(' • ');

                return (
                    <Box>
                        {aiButton && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    mb: 0.5
                                }}
                            >
                                <InputLabel
                                    htmlFor={fieldId}
                                    required={required}
                                    error={!!error}
                                    sx={{
                                        position: 'relative',
                                        transform: 'none',
                                        fontSize: '0.75rem',
                                        color: error ? 'error.main' : 'text.secondary',
                                        fontWeight: 400
                                    }}
                                >
                                    {label}
                                </InputLabel>
                                {aiButton}
                            </Box>
                        )}
                        <TextField
                            {...field}
                            id={fieldId}
                            onChange={(e) => {
                                field.onChange(e);
                                if (externalOnChange) {
                                    externalOnChange(e.target.value);
                                }
                            }}
                            fullWidth
                            multiline
                            rows={rows}
                            label={aiButton ? undefined : label}
                            helperText={combinedHelperText}
                            error={!!error}
                            required={!aiButton && required}
                            placeholder={aiButton ? label : undefined}
                            slotProps={{
                                htmlInput: {
                                    'aria-label': label,
                                    'aria-required': required ? 'true' : 'false',
                                    maxLength: maxLength
                                },
                                formHelperText: {
                                    sx: { ml: 0, mr: 0 }
                                }
                            }}
                        />
                    </Box>
                );
            }}
        />
    );
};

export default FormTextArea;
