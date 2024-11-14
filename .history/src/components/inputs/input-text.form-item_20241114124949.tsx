import React from 'react';
import {Input, InputProps} from '@ui-kitten/components';
import {Controller, useFormContext} from 'react-hook-form';
import {InputText} from './input-text'; // Assuming InputText is your custom component

export interface FormInputProps extends InputProps {
  name: string;
  id: string;
  autoStatus?: boolean;
  autoCaption?: boolean;
}

const useInputValidationState = (
  props: FormInputProps,
): Partial<InputProps> => {
  const {errors, touched} = useFormContext(); // Get form context
  const error = errors[props.id]; // Access error state by field id
  const isTouched = touched[props.id]; // Check if the field was touched

  const validationState: Partial<InputProps> = {
    status:
      (props.autoStatus && error && isTouched && 'danger') || props.status,
    caption:
      (props.autoCaption && isTouched && error?.trim().length && error) ||
      props.caption,
  };

  return validationState;
};

export const InputTextValidation = React.forwardRef(
  (props: FormInputProps, ref: React.Ref<Input>) => {
    const {id, name, autoStatus, autoCaption, ...inputProps} = props;
    const validationState = useInputValidationState({
      name,
      id,
      autoStatus,
      autoCaption,
      ...inputProps,
    });

    return (
      <Controller
        control={useFormContext().control} // Use the control object from react-hook-form
        render={({field: {onChange, value}}) => (
          <InputText
            {...inputProps}
            value={value}
            onChangeText={onChange}
            size="small"
            {...validationState}
          />
        )}
        name={id} // Field name should match the id
        rules={{required: `${name} is required`}} // Example validation rule, you can customize
      />
    );
  },
);

InputTextValidation.defaultProps = {
  autoStatus: true,
  autoCaption: true,
};
