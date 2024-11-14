import React from 'react';
import {Input, InputProps} from '@ui-kitten/components';
import {Controller, useFormContext} from 'react-hook-form';

interface InputFieldProps extends InputProps {
  name: string; // Field name for the form
  label: string; // Label for the input
  rules?: object; // Validation rules
  autoStatus?: boolean; // Automatically manage status based on validation
  autoCaption?: boolean; // Automatically display caption (error message)
}

const InputField = React.forwardRef<Input, InputFieldProps>((props, ref) => {
  const {
    name,
    label,
    rules = {},
    autoStatus = true,
    autoCaption = true,
    ...inputProps
  } = props;

  const {
    control,
    formState: {errors, touchedFields},
  } = useFormContext(); // Access form context

  // Get the error for the specific field, if any
  const error = errors[name];
  const isTouched = touchedFields[name];

  // Generate validation state for the input
  const validationState = {
    status: autoStatus && error && (isTouched || true) ? 'danger' : undefined,
    caption: autoCaption && error?.message ? error.message : undefined, // Show error message if available
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {onChange, value}}) => (
        <Input
          {...(inputProps as any)}
          label={label}
          value={value}
          onChangeText={onChange}
          ref={ref}
          {...validationState}
          style={{}}
        />
      )}
    />
  );
});

InputField.displayName = 'InputField'; // For better debugging in React DevTools

export default InputField;
