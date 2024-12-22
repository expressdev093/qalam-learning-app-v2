import {
  Button,
  Icon,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Keyboard,
  StatusBar,
} from 'react-native';
import * as Yup from 'yup';
import {Formik, FormikProps} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';
import {useAppSelector} from '../../redux';
import {RootStackNavigationProp} from '../../navigations/root/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FormProvider, useForm} from 'react-hook-form';
import {LoadingButton} from '../../components/buttons';
import {Modal} from 'react-native';
import {InputField} from '../../components/inputs';
import {ThemeColorKey} from '../../constants/colors';

interface FormProps {
  //currentPassword: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormProps = {
  //currentPassword: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  //currentPassword: Yup.string().required('Current password is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required'),
});

export const ChangePasswordScreen = () => {
  const theme = useTheme();
  const form = useForm<FormProps>({
    defaultValues: initialValues,
  }); //
  const {user} = useAppSelector(state => state.auth);
  // const [updateUser, {isLoading, isError, error, isSuccess}] =
  //   Api.useUpdateUserMutation();
  const [successModalVisible, setSuccessModalVisible] =
    useState<boolean>(false);
  const [currentSecureTextEntry, setCurrentSecureTextEntry] =
    React.useState(true);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] =
    React.useState(true);
  const navigation = useNavigation<RootStackNavigationProp<any>>();
  const styles = useStyleSheet(themedStyle);

  const renderPasswordIcon = (props: any) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderConfirmPasswordIcon = (props: any) => (
    <TouchableWithoutFeedback
      onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)}>
      <Icon {...props} name={confirmSecureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCurrentPasswordIcon = (props: any) => (
    <TouchableWithoutFeedback
      onPress={() => setCurrentSecureTextEntry(!currentSecureTextEntry)}>
      <Icon {...props} name={currentSecureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const onSubmit = async (values: FormProps) => {
    // try {
    //   Keyboard.dismiss();
    //   const result = await updateUser({
    //     id: user?.id!,
    //     password: values.password,
    //   }).unwrap();
    //   if (result) {
    //     setSuccessModalVisible(true);
    //     formikRef.current?.resetForm();
    //   }
    // } catch (err) {}
  };

  const onOk = () => {
    setSuccessModalVisible(false);
    navigation.goBack();
  };

  return (
    <FormProvider {...form}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={theme[ThemeColorKey.backgroundBasicColor1]}
          barStyle={'dark-content'}
        />
        <View style={styles.backButtonView}>
          <HeaderBackButton
            onPress={() => navigation.goBack()}
            labelStyle={false}
          />
        </View>
        <Layout style={styles.layout}>
          <Text category="h2" style={styles.heading1}>
            Change Password
          </Text>
          <Text category="p1" style={styles.description}>
            Enter your new password and remember not to forget it again
          </Text>
          <View style={{marginTop: 40, width: '100%'}}>
            <InputField
              name="password"
              label="Password"
              placeholder="Password"
              rules={{
                required: 'Password is required',
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must contain at least 8 characters, including uppercase, lowercase, number, and symbol',
                },
              }}
              secureTextEntry={secureTextEntry}
              accessoryRight={renderPasswordIcon}
            />
            <InputField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              rules={{
                required: 'Confirm Password is required',
                validate: (value: string) =>
                  value === form.getValues('password') ||
                  'Passwords do not match',
              }}
              secureTextEntry={secureTextEntry}
              accessoryRight={renderPasswordIcon}
            />
            <LoadingButton
              loading={false}
              onPress={form.handleSubmit(onSubmit)}
              style={{marginTop: 20}}>
              Reset Password
            </LoadingButton>
          </View>
        </Layout>
        {/* <Modal
        visible={successModalVisible}
        onBackdropPress={() => setSuccessModalVisible(false)}>
        <SuccessPassword />
        <Text category="h5" style={styles.h}>
          Successful
        </Text>
        <Text category="p1" style={styles.p}>
          Your password has been updated successfully.
        </Text>
        <Button onPress={onOk} style={styles.button}>
          {'Ok'}
        </Button>
      </Modal> */}
      </SafeAreaView>
    </FormProvider>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
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
  p: {
    textAlign: 'center',
    marginTop: 20,
  },
  h: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});
