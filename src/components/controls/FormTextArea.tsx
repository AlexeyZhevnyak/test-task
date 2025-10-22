import {TextField} from '@mui/material';
import {Control, Controller, FieldValues, Path, RegisterOptions} from 'react-hook-form';

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
                                                 onChange: externalOnChange
                                             }: FormTextAreaProps<T>) => {
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
                    multiline
                    rows={rows}
                    label={label}
                    helperText={error?.message || helperText}
                    error={!!error}
                    required={required}
                    slotProps={{
                        htmlInput: {
                            'aria-label': label,
                            'aria-required': required ? 'true' : 'false',
                            maxLength: maxLength
                        }
                    }}
                />
            )}
        />
    );
};

export default FormTextArea;
