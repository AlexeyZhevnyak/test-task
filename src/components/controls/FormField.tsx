import {TextField} from '@mui/material';
import {Control, Controller, FieldValues, Path, RegisterOptions} from 'react-hook-form';

export interface FormFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    rules?: RegisterOptions<T>;
    helperText?: string;
    type?: string;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;
    onChange?: (value: any) => void;
}

const FormField = <T extends FieldValues>({
                                              name,
                                              control,
                                              label,
                                              rules,
                                              helperText,
                                              type = 'text',
                                              required = false,
                                              onChange: externalOnChange
                                          }: FormFieldProps<T>) => {
    return (

        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field, fieldState: {error}}) => (
                <TextField
                    {...field}
                    onChange={(e) => {
                        field.onChange(e);
                        if (externalOnChange) {
                            externalOnChange(e.target.value);
                        }
                    }}
                    fullWidth
                    type={type}
                    label={label}
                    helperText={error?.message || helperText}
                    error={!!error}
                    required={required}
                    slotProps={{
                        htmlInput: {
                            'aria-label': label,
                            'aria-required': required ? 'true' : 'false',
                        }
                    }}
                />
            )}
        />
    );
};

export default FormField;
