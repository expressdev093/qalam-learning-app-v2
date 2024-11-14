import {useList} from '@refinedev/core';
import React, {useRef} from 'react';
import {View} from 'react-native';

import * as Yup from 'yup';
import {IBoard} from '../../../interfaces';
import {Formik, FormikProps} from 'formik';
import {IndexPath, Input, Select, SelectItem} from '@ui-kitten/components';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';

interface FormProps {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  board: number;
  grade: number;
  phoneNumber: string;
  countryCode: string;
  countryShortCode: string;
  isAgree: boolean;
}

const initialValues: FormProps = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  board: 0,
  grade: 0,
  phoneNumber: '3471234567',
  countryCode: '+92',
  countryShortCode: 'PK',
  isAgree: true,
};

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required'),
  board: Yup.number().min(1, 'Select board').required('Board is required'),
  grade: Yup.number().min(1, 'Select grade').required('Grade is required'),
  phoneNumber: Yup.string().trim().required('Valid phone number is required'),
});

export const SignUpForm = () => {
  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));
  const formikRef = useRef<FormikProps<FormProps>>(null);
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<FormProps>();

  const boardsResult = useList<IBoard>({
    resource: 'boards',
    pagination: {
      mode: 'off',
    },
  });

  const boards = boardsResult.data?.data;

  const onSubmit: SubmitHandler<FormProps> = data => {
    console.log(data);
  };

  return (
    <View style={{flex: 1}}>
      {/* <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          values,
          errors,
          touched,
        }) => {
          return (
            <React.Fragment>
              <Select
                placeholder={'Select Board'}
                selectedIndex={new IndexPath(values.board)}
                onSelect={index => setSelectedIndex(index)}>
                <SelectItem title="Option 1" />
                <SelectItem title="Option 2" />
                <SelectItem title="Option 3" />
              </Select>
            </React.Fragment>
          );
        }}
      </Formik> */}
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <Input
            placeholder="Enter your name"
            value={value as any}
            onChangeText={onChange}
          />
        )}
        name="fullName"
        rules={{required: 'Name is required'}}
      />
    </View>
  );
};
