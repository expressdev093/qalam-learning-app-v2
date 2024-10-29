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
    <SafeAreaView>
      <View style={styles.backButtonView}>
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          labelStyle={false}
        />
      </View>
    </SafeAreaView>
  );
};

const themedStyle = StyleService.create({
  backButtonView: {
    paddingHorizontal: 20,
  },
  heading1: {
    color: 'color-primary-500',
  },
  forgotPasswordView: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: 'color-primary-500',
  },
});
