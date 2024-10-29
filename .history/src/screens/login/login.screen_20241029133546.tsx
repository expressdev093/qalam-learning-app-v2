import {StyleService, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {HeaderBackButton} from '@react-navigation/elements';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';

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
    <SafeAreaView>
      <View style={styles.backButtonView}>
        <HeaderBackButton
          onPress={() => {
            if(navigation.canGoBack() {
              navigation.goBack()
            })
          }}
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
