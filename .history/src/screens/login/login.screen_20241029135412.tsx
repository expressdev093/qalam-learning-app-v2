import {Layout, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {HeaderBackButton} from '@react-navigation/elements';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {Alert} from '../../components/alerts';
import {Formik} from 'formik';

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

export const LoginScreen: React.FC<RootStackScreenProps<RouteNames.login>> = ({
  navigation,
}) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout>
        <Text category="h2" style={styles.heading1}>
          Hello,
        </Text>
        <Text category="h3">Welcome Back</Text>
        <View style={{marginTop: 40, width: '100%'}}>
          <Alert
            closeable
            visible={true}
            message={'Invalid email/password'}
            variant="danger"
            onClose={() => {}}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({handleSubmit, handleBlur, handleChange, values}) => (
              <React.Fragment>
                <InputTextValidation
                  status="default"
                  keyboardType="email-address"
                  label="Email Address"
                  size="large"
                  name="email"
                  id="email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />

                <InputTextValidation
                  status="default"
                  size="large"
                  name="password"
                  id="password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  label="Password"
                  accessoryRight={renderPasswordIcon}
                  secureTextEntry={secureTextEntry}
                />
                <TouchableWithoutFeedback
                  style={styles.forgotPasswordView}
                  onPress={() => navigation.navigate(RouteNames.resetPassword)}>
                  <Text style={styles.forgotPasswordText}>
                    Forget Passowrd?
                  </Text>
                </TouchableWithoutFeedback>
                <LoadingButton
                  loading={isLoading}
                  onPress={handleSubmit as any}
                  style={{marginTop: 20}}>
                  Login
                </LoadingButton>
              </React.Fragment>
            )}
          </Formik>
        </View>
      </Layout>
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
