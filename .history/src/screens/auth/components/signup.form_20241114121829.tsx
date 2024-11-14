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

export const SignUpForm = () => {
  return <View></View>;
};
