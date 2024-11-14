import React from 'react';
import {View} from 'react-native';

import * as Yup from 'yup';

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
  return <View></View>;
};
