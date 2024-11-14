import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {StatusBar, TouchableWithoutFeedback, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {HeaderBackButton} from '@react-navigation/elements';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {Alert} from '../../components/alerts';
import {Formik} from 'formik';
import {InputTextValidation} from '../../components/inputs';
import {Icon} from '../../components/icon';
import {LoadingButton} from '../../components/buttons';
import {HorizontalLineWithText} from '../../components/horizontal-line-text';
import {Facebook, Google} from '../../components/svgs';
import {Colors} from '../../constants/colors';
import {
  type LoginFormTypes,
  useActiveAuthProvider,
  useLogin,
} from '@refinedev/core';
import {useAppDispatch} from '../../redux';
import {AuthActions} from '../../redux/reducers/auth.reducer';

interface LoginFormProps {
  email: string;
  password: string;
}

const initialValues: LoginFormProps = {
  email: 'amrafridi.29@gmail.com',
  password: '@Abc1234',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const LoginScreen: React.FC<RootStackScreenProps<RouteNames.login>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const styles = useStyleSheet(themedStyle);
  const authProvider = useActiveAuthProvider();
  const {mutate: login, isLoading} = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const onSubmit = async (values: LoginFormProps) => {
    login(
      {
        ...values,
      },
      {
        onSuccess: (data: any) => {
          dispatch(
            AuthActions.loggedIn({
              user: data.user,
              token: data.token,
            }),
          );
          navigation.navigate(data.redirectTo);
        },
      },
    );
  };

  const renderPasswordIcon = (props: any) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={Colors.basicBackgroundColor1}
        barStyle="dark-content"
      />
      <Layout style={styles.container}>
        <Text category="h2" style={styles.heading1}>
          Hello,
        </Text>
        <Text category="h3">Welcome Back</Text>
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
                  onPress={() =>
                    navigation.navigate(RouteNames.forgotPassword)
                  }>
                  <Text style={styles.forgotPasswordText}>
                    Forget Password?
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
        <HorizontalLineWithText text="or" style={{marginTop: 20}} />
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Button
            onPress={() => navigation.navigate(RouteNames.signUp)}
            // accessoryLeft={props => <Apple {...props} width={36} height={36} />}
            appearance="ghost">
            {' '}
            Create Account
          </Button>
          <Button appearance="ghost" />
          <Button appearance="ghost" />
        </View>
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
  forgotPasswordView: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: 'color-primary-500',
  },
});
