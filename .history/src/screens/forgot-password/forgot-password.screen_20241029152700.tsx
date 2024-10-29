import React from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {Colors} from '../../constants/colors';
import {Layout, StyleService, useStyleSheet} from '@ui-kitten/components';

interface FormProps {
  email: string;
}

const initialValues: FormProps = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Email is required'),
});

export const ForgotPasswordScreen = () => {
  const styles = useStyleSheet(themedStyle);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={Colors.basicBackgroundColor1}
        barStyle="dark-content"
      />
      <Layout style={styles.container}>
        <Text category="h2" style={styles.heading1}>
          Reset Password
        </Text>
        <Text category="p1" style={styles.description}>
          Follow the instructions in the email to activate the new password
        </Text>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButtonView: {
    paddingHorizontal: 20,
  },
  heading1: {
    color: 'color-primary-500',
  },
  description: {
    textAlign: 'center',
    marginTop: 20,
  },
});
