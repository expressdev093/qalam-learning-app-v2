import React from 'react';
import {Text, View} from 'react-native';

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
    <View style={{flex: 1}}>
      <Text>LoginScreen</Text>
    </View>
  );
};
