import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../../screens/auth/login.screen';
import {createStaticNavigation} from '@react-navigation/native';
import React from 'react';

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export const RootStackComponent = () => {
  return <Navigation />;
};
