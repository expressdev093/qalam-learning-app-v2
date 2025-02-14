import {
  IndexPath,
  Layout,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
//import PhoneInput from 'react-native-phone-number-input';
import {HeaderBackButton} from '@react-navigation/elements';
//import PhoneInput from 'react-native-phone-number-input';
import {IBoard, IBoardClass, IUser} from '../../interfaces';
import {useAppDispatch, useAppSelector} from '../../redux';
import {useList, useUpdate} from '@refinedev/core';
import {RootStackNavigationProp} from '../../navigations/root/types';
import {AuthActions} from '../../redux/reducers/auth.reducer';
import {FormProvider, useForm} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputField} from '../../components/inputs';
import {SelectField} from '../../components/select/select.form';
import {BackButton, LoadingButton} from '../../components/buttons';
import {Colors, ThemeColorKey} from '../../constants/colors';
import Toast from 'react-native-toast-message';
import {Icon} from '../../components/icon';

interface FormProps {
  firstName: string;
  lastName: string;
  boardId: number;
  boardClassId: number;
}

const initialValues: FormProps = {
  firstName: '',
  lastName: '',
  boardId: 0,
  boardClassId: 0,
};

export const ProfileEditScreen = () => {
  const theme = useTheme();
  const form = useForm<FormProps>({
    defaultValues: initialValues,
  }); // Initialize the form context
  const [boardSelectedIndex, setBoardSelectedIndex] = React.useState<IndexPath>(
    new IndexPath(0),
  );
  const [boardClassSelectedIndex, setBoardClassSelectedIndex] =
    React.useState<IndexPath>(new IndexPath(0));
  const dispatch = useAppDispatch();
  const {user, token} = useAppSelector(state => state.auth);

  const updateUserMutation = useUpdate<IUser>({});
  const phoneInput = useRef<any>(null);
  const navigation = useNavigation<RootStackNavigationProp<any>>();

  const styles = useStyleSheet(themedStyle);

  const onSubmit = async (values: FormProps) => {
    const {boardClassId, boardId, ...rest} = values;
    const newValues: Partial<IUser> = {
      ...rest,
      id: user?.id,
      boardClassId: boardClassId,
      boardId: boardId,
    };

    updateUserMutation.mutateAsync(
      {
        resource: 'users',
        id: user?.id,
        values: newValues,
        meta: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
      {
        onSuccess: data => {
          if (data.data) {
            dispatch(AuthActions.update(data.data));
          }
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Your account updated successfully',
          });
        },
        onError: (error: any) => {
          const message = error.errors[''].join('') || error.message;
          Toast.show({
            type: 'error',
            text1: 'OOPS',
            text2: message,
          });
        },
      },
    );
  };

  const getErrorMessage = (errors: any, touched: any, name: string) => {
    const error = errors[name];
    const isTouched = touched[name];
    return error && isTouched ? error : undefined;
  };

  const boardState = useList<IBoard>({
    resource: 'boards',
    pagination: {
      mode: 'off',
    },
  });

  const selectedBoardId = form.watch('boardId');
  const boardClassesState = useList<IBoardClass>({
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

  const boards = boardState.data?.data;
  const boardClasses = boardClassesState.data?.data;

  useEffect(() => {
    if (user) {
      form.setValue('firstName', user.firstName);
      form.setValue('lastName', user.lastName);
      form.setValue('boardClassId', user.boardClassId || -1);
      form.setValue('boardId', user.boardId || -1);
    }
  }, [user, form]);

  return (
    <FormProvider {...form}>
      <StatusBar
        backgroundColor={theme[ThemeColorKey.backgroundBasicColor1]}
        barStyle={'dark-content'}
      />
      <SafeAreaView style={styles.container}>
        <BackButton navigation={navigation} />

        <ScrollView style={{flex: 1, overflow: 'scroll'}}>
          <Layout style={styles.layout}>
            <Text category="h2" style={styles.heading1}>
              Edit Profile
            </Text>
            <Text category="p1" style={styles.p}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </Text>
            <View style={{marginTop: 40, width: '100%'}}>
              {/* <Alert
              closeable
              visible={isError}
              message={ParseErrorWithMessage(error)?.message}
              variant="danger"
              onClose={() => {}}
            />
            <Alert
              closeable
              visible={isSuccess}
              message={'Profile updated successfully'}
              variant="success"
              onClose={() => {}}
            /> */}
              <InputField
                name="firstName"
                label="First Name"
                placeholder="First Name"
                rules={{
                  required: 'First name is required',
                }}
              />
              <InputField
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                rules={{
                  required: 'Last name is required',
                }}
              />

              <View
                style={{flexDirection: 'row', marginBottom: 10, width: '100%'}}>
                <View style={{flex: 1}}>
                  <SelectField
                    data={boards ?? []}
                    titleField="name"
                    valueField="id"
                    name="boardId"
                    placeholder="Select Board"
                    inputStyle={{flex: 1}}
                  />
                </View>
                <View style={{width: 5}} />
                <View style={{flex: 1}}>
                  <SelectField
                    data={boardClasses ?? []}
                    titleField="name"
                    valueField="id"
                    name="boardClassId"
                    placeholder="Select Class"
                  />
                </View>
              </View>

              <LoadingButton
                loading={
                  boardClassesState.isLoading ||
                  boardState.isLoading ||
                  updateUserMutation.isLoading
                }
                onPress={form.handleSubmit(onSubmit)}
                style={{marginTop: 20}}>
                Save
              </LoadingButton>
            </View>
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </FormProvider>
  );
};

export const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: Colors.basicBackgroundColor1,
  },
  layout: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    height: 'auto',
  },

  heading1: {
    color: 'color-primary-500',
  },
  p: {
    textAlign: 'center',
    marginTop: 10,
  },

  phoneContainer: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    borderRadius: 15,
  },
  textInput: {
    paddingVertical: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  primaryP: {
    color: 'color-primary-500',
  },
  termConditionView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  select: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  phone: {marginTop: -5, color: 'color-danger-500'},
});
