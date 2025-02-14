import React from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, View} from 'react-native';
import {Colors} from '../../constants/colors';
import {Layout, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {InputTextValidation} from '../../components/inputs';
import {BackButton, LoadingButton} from '../../components/buttons';
import {type ForgotPasswordFormTypes, useForgotPassword} from '@refinedev/core';
import Toast from 'react-native-toast-message';

interface FormProps {
  email: string;
}

// const initialValues: FormProps = {
//   email: 'amrafridi.29@gmail.com',
// };

const initialValues: FormProps = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Email is required'),
});

export const ForgotPasswordScreen: React.FC<
  RootStackScreenProps<RouteNames.forgotPassword>
> = ({navigation}) => {
  const styles = useStyleSheet(themedStyle);

  const {mutate: forgotPassword, isLoading} =
    useForgotPassword<ForgotPasswordFormTypes>();

  const onSubmit = async (values: FormProps) => {
    forgotPassword(values, {
      onSuccess(data, variables, context) {
        Toast.show({
          type: 'success',
          text1: 'Email sent',
          text2: 'We have sent you an email to reset your password',
        });
        navigation.navigate(data.redirectTo as any);
      },
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={Colors.basicBackgroundColor1}
        barStyle="dark-content"
      />

      <Layout style={styles.container}>
        <BackButton navigation={navigation} />
        <View style={styles.content}>
          <Text category="h2" style={styles.heading1}>
            Reset Password
          </Text>
          <Text category="p1" style={styles.description}>
            Follow the instructions in the email to activate the new password
          </Text>
          <View style={{marginTop: 40, width: '100%'}}>
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

                  <LoadingButton
                    loading={isLoading}
                    onPress={handleSubmit as any}
                    style={{marginTop: 20}}>
                    Send
                  </LoadingButton>
                </React.Fragment>
              )}
            </Formik>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  content: {
    flex: 1,
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
