import {
  HttpError,
  useActiveAuthProvider,
  useApiUrl,
  useCreate,
  useCustomMutation,
  useList,
  useRegister,
} from '@refinedev/core';
import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IBoard, IBoardClass, IUser} from '../../../interfaces';
import {
  CheckBox,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
} from 'react-hook-form';
import {LoadingButton} from '../../../components/buttons';
import {InputField} from '../../../components/inputs';
import {SelectField} from '../../../components/select/select.form';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../../navigations/root/types';
import {RouteNames} from '../../../navigations/constants/route.name';
import {Icon} from '../../../components/icon';
import {Utils} from '../../../constants/utils';
import {LoginProvider, Role} from '../../../interfaces/enum';

interface FormProps {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  boardId: number;
  boardClassId: number;
  phoneNumber: string;
  countryCode: string;
  countryShortCode: string;
  isAgree: boolean;
}

const initialValues: FormProps = {
  fullName: 'Test Test1',
  email: 'test1@gmail.com',
  password: '@Abc1234',
  confirmPassword: '@Abc1234',
  boardId: -1,
  boardClassId: -1,
  phoneNumber: '3471234567',
  countryCode: '+92',
  countryShortCode: 'PK',
  isAgree: true,
};

export const SignUpForm = () => {
  const authProvider = useActiveAuthProvider();
  const {mutate: register, isLoading: isRegistering} = useRegister<FormProps>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const navigation =
    useNavigation<RootStackNavigationProp<RouteNames.signUp>>();
  const styles = useStyleSheet(themedStyle);
  const form = useForm<FormProps>({
    defaultValues: initialValues,
  }); // Initialize the form context

  const boardsResult = useList<IBoard>({
    resource: 'boards',
    pagination: {
      mode: 'off',
    },
  });

  const boards = boardsResult.data?.data;

  const selectedBoardId = form.watch('boardId');
  const isAgree = form.watch('isAgree', false); // Watch the value of 'isAgree'

  const boardClassesResult = useList<IBoardClass>({
    resource: 'board-classes',
    pagination: {
      mode: 'off',
    },
    filters: [
      {
        field: 'boardId',
        operator: 'eq',
        value: selectedBoardId,
      },
    ],
    queryOptions: {
      enabled: !!selectedBoardId && selectedBoardId !== 0,
    },
  });

  const boardClasses = boardClassesResult.data?.data;

  const onSubmit: SubmitHandler<FormProps> = data => {
    const {fullName, confirmPassword, boardId, boardClassId, isAgree, ...rest} =
      data;
    const {firstName, lastName} = Utils.extractName(fullName);

    if (boardId === -1) {
      form.setError('boardId', {
        message: 'Select Board',
      });
      return;
    }

    if (boardClassId === -1) {
      form.setError('boardClassId', {
        message: 'Select Class',
      });
      return;
    }

    const newUser: any = {
      ...rest,
      firstName,
      lastName,
      role: Role.User,
      isVerified: false,
      isActive: true,
      provider: LoginProvider.EmailPassword,
      boardClassId: boardClassId,
      boardId: boardId,
    };

    register(
      {
        ...newUser,
      },
      {
        onSuccess: (data: any) => {
          navigation.goBack();
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
    <FormProvider {...form}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View>
              <InputField
                name="fullName"
                label="Full Name"
                placeholder="Full Name"
                rules={{
                  required: 'Full name is required',
                }}
              />
              <SelectField
                data={boards ?? []}
                titleField="name"
                valueField="id"
                name="boardId"
                placeholder="Select Board"
              />
              <SelectField
                data={boardClasses ?? []}
                titleField="name"
                valueField="id"
                name="boardClassId"
                placeholder="Select Class"
              />
              <InputField
                name="email"
                label="Email"
                placeholder="Email Address"
                rules={{
                  required: 'Email address is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex for basic email validation
                    message: 'Please enter a valid email address', // Error message for invalid email
                  },
                }}
              />
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
            </View>
          </ScrollView>
          <View style={styles.termConditionView}>
            <Controller
              name="isAgree"
              control={form.control} // Ensure you're passing the `control` from `useForm()`
              defaultValue={false} // Default value for the checkbox
              render={({field}) => (
                <CheckBox
                  checked={field.value}
                  onChange={field.onChange}
                  style={{marginTop: 10, marginRight: 20}}
                />
              )}
            />
            <View>
              <Text style={styles.p}>I have read and agree to the </Text>
              <TouchableOpacity>
                <Text style={[styles.primaryP, {marginLeft: 5}]}>
                  terms and conditions
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <LoadingButton
              disabled={!isAgree}
              loading={isRegistering}
              onPress={form.handleSubmit(onSubmit)}
              style={{marginTop: 20}}>
              Sign up
            </LoadingButton>
            <View style={styles.loginTextView}>
              <Text style={styles.p}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.primaryP}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  loginTextView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  p: {
    textAlign: 'center',
    marginTop: 10,
  },
  termConditionView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
