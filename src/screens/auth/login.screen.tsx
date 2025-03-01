import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {Formik} from 'formik';
import {InputTextValidation} from '../../components/inputs';
import {Icon} from '../../components/icon';
import {BackButton, LoadingButton} from '../../components/buttons';
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
import {CommonActions} from '@react-navigation/native';

interface LoginFormProps {
  email: string;
  password: string;
}

const initialValues: LoginFormProps = {
  email: 'amrafridi.29@gmail.com',
  password: '@Abc1234',
};

// const initialValues: LoginFormProps = {
//   email: '',
//   password: '',
// };

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
          // const resetAction = StackActions.reset({
          //   index: 0,
          //   actions: [
          //     NavigationActions.navigate({
          //       routeName: RouteNames.authentication,
          //     }),
          //   ],
          // });
          //  navigation.dispatch(resetAction);

          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: data.redirectTo,
                },
              ],
            }),
          );

          // navigation.reset({
          //   index: 0,
          //   routes: [{name: data.redirectTo}], // Replace 'Home' with the main screen of your RootStack
          // });
        },
      },
    );
  };

  const renderPasswordIcon = (props: any) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon
        {...props}
        color="#000"
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );

  const googleSignIn = async () => {};

  const onFacebookButtonPress = async () => {};

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
            Hello,
          </Text>
          <Text category="h3">Welcome Back</Text>
          <View
            style={{
              marginTop: 40,
              width: '100%',
              justifyContent: 'center',
            }}>
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
          <HorizontalLineWithText text="Or" style={{marginTop: 20}} />
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Button
              onPress={googleSignIn}
              accessoryLeft={props => (
                <Google {...props} width={36} height={36} />
              )}
              appearance="ghost"
            />
            <Button
              onPress={onFacebookButtonPress}
              accessoryLeft={props => (
                <Facebook {...props} width={36} height={36} />
              )}
              appearance="ghost"
            />
          </View>
        </View>
      </Layout>
      <View style={styles.footer}>
        <Text style={styles.p}>Don't have an account yet? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteNames.signUp)}>
          <Text style={styles.primaryP}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  content: {
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
    textAlign: 'right',
  },
  footer: {
    minHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.basicBackgroundColor1,
  },
  p: {
    textAlign: 'center',
    marginTop: 10,
  },
  primaryP: {
    color: 'color-primary-500',
    marginTop: 10,
  },
});
