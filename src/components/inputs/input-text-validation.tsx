import {Input, InputProps} from '@ui-kitten/components';
import {FormikContextType, useFormikContext} from 'formik';
import React from 'react';
import {InputText} from './input-text';

export interface FormInputProps extends InputProps {
  name: string;
  id: string;
  autoStatus?: boolean;
  autoCaption?: boolean;
}

type ValuesType = {
  [key: string]: string;
};

type ErrorType = {
  [key: string]: string;
};

const useFormikInputState = (props: FormInputProps): Partial<InputProps> => {
  const formContext: FormikContextType<{}> = useFormikContext();
  const value = (formContext.values as ValuesType)[props.id];
  const error: string = (formContext.errors as ErrorType)[props.id];
  const touched: boolean = (
    formContext.touched as {
      [key: string]: boolean;
    }
  )[props.id];

  const validationState: Partial<InputProps> = {
    status: (props.autoStatus && error && touched && 'danger') || props.status,
    caption:
      (props.autoCaption && touched && error?.trim().length && error) ||
      props.caption,
  };

  const onChangeText = (nextValue: string): void => {
    formContext.setFieldValue(props.id, nextValue ? nextValue : null);
    props.onChangeText?.(nextValue);
  };

  return {
    value,
    ...validationState,
    onChangeText,
  };
};

export const InputTextValidation = React.forwardRef(
  (props: FormInputProps, ref: React.Ref<Input>) => {
    const {id, name, autoStatus, autoCaption, ...inputProps} = props;
    const state = useFormikInputState({
      name,
      id,
      autoStatus,
      autoCaption,
      ...inputProps,
    });

    return <InputText size="small" {...inputProps} {...state} />;
  },
);

InputTextValidation.defaultProps = {
  autoStatus: true,
  autoCaption: true,
};
