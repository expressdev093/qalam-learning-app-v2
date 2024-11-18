import {useList} from '@refinedev/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import * as Yup from 'yup';
import {IBoard} from '../../../interfaces';
import {
  IndexPath,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {useForm, SubmitHandler, FormProvider} from 'react-hook-form';
import {LoadingButton} from '../../../components/buttons';
import {InputField, InputTextValidation} from '../../../components/inputs';
import {SelectField} from '../../../components/select/select.form';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../../navigations/root/types';
import {RouteNames} from '../../../navigations/constants/route.name';

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

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required'),
  board: Yup.number().min(1, 'Select board').required('Board is required'),
  grade: Yup.number().min(1, 'Select grade').required('Grade is required'),
  phoneNumber: Yup.string().trim().required('Valid phone number is required'),
});

export const SignUpForm = () => {
  const navigation =
    useNavigation<RootStackNavigationProp<RouteNames.signUp>>();
  const styles = useStyleSheet(themedStyle);
  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));
  const methods = useForm<FormProps>({
    defaultValues: initialValues,
  }); // Initialize the form context

  const boardsResult = useList<IBoard>({
    resource: 'boards',
    pagination: {
      mode: 'off',
    },
  });

  const boards = boardsResult.data?.data;

  const onSubmit: SubmitHandler<FormProps> = data => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <SelectField
            data={boards ?? []}
            titleField="name"
            valueField="id"
            name="board"
            placeholder="Select Board"
          />
          <InputField
            name="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            rules={{required: 'Full name is required'}}
          />
          <LoadingButton
            onPress={methods.handleSubmit(onSubmit)}
            style={{marginTop: 20}}>
            Sign up
          </LoadingButton>
        </View>
        <View style={styles.footer}>
          <Text style={styles.p}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.primaryP}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FormProvider>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
  },
  formContainer: {
    flex: 1,
  },
  primaryP: {
    color: 'color-primary-500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  p: {
    textAlign: 'center',
    marginTop: 10,
  },
});
