import {TextField} from '@mui/material';
import {Control, Controller, FieldValues, Path, RegisterOptions} from 'react-hook-form';

export interface FormDatePickerProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    rules?: RegisterOptions<T>;
    helperText?: string;
    required?: boolean;
    maxDate?: string;
    minDate?: string;
    onChange?: (value: string) => void;
}

const FormDatePicker = <T extends FieldValues>({
                                                   name,
                                                   control,
                                                   label,
                                                   rules,
                                                   helperText,
                                                   required = false,
                                                   maxDate,
                                                   minDate,
                                                   onChange: externalOnChange
                                               }: FormDatePickerProps<T>) => {
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
                    type="date"
                    label={label}
                    error={!!error}
                    helperText={error?.message || helperText}
                    required={required}
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        },
                        htmlInput: {
                            'aria-label': label,
                            'aria-required': required ? 'true' : 'false',
                            max: maxDate,
                            min: minDate
                        }
                    }}
                />
            )}
        />
    );
};

export default FormDatePicker;
