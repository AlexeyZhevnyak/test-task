import {MenuItem, TextField} from '@mui/material';
import {Theme} from '@mui/material/styles';
import {Control, Controller, FieldValues, Path, RegisterOptions,} from 'react-hook-form';

export interface SelectOption {
    value: string;
    label: string;
}

export interface FormSelectProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    options: SelectOption[];
    rules?: RegisterOptions<T>;
    helperText?: string;
    required?: boolean;
    onChange?: (value: string) => void;
}

const FormSelect = <T extends FieldValues>({
                                               name,
                                               control,
                                               label,
                                               options,
                                               rules,
                                               helperText,
                                               required = false,
                                               onChange: externalOnChange
                                           }: FormSelectProps<T>) => {
    const arrowSpacing = (fieldValue: unknown, {direction}: Theme) => {
        if (fieldValue) {
            return {}
        }
        if (direction === 'ltr') {
            return {
                left: 'auto',
                right: 8,
            }
        } else {
            return {
                right: 8,
                left: 'auto',
            }
        }
    }

    return <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field, fieldState: {error}}) => <TextField
            {...field}
            onChange={(e) => {
                field.onChange(e);
                if (externalOnChange) {
                    externalOnChange(e.target.value);
                }
            }}
            sx={(theme) => ({
                '& .MuiSelect-icon': arrowSpacing(field.value, theme),
            })}
            select
            fullWidth
            label={label}
            error={!!error}
            helperText={error?.message || helperText}
            required={required}
            slotProps={{
                htmlInput: {
                    'aria-label': label,
                    'aria-required': required ? 'true' : 'false',
                }
            }}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>}
    />;
};

export default FormSelect;
