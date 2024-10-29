import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';

interface LoginFormProps {
  email: string;
  password: string;
}

const initialValues: LoginFormProps = {
  email: 'testuser@gmail.com',
  password: '12345',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const LoginScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>LoginScreen</Text>
    </SafeAreaView>
  );
};
