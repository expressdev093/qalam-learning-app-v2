import React from 'react';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {Colors} from '../../constants/colors';
import {SignUpForm} from './components/signup.form';
import {View} from 'react-native-animatable';
import {Text} from '@ui-kitten/components';

export const SignUpScreen: React.FC<
  RootStackScreenProps<RouteNames.signUp>
> = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={Colors.basicBackgroundColor1}
        barStyle="dark-content"
      />
      <SignUpForm />
    </SafeAreaView>
  );
};
