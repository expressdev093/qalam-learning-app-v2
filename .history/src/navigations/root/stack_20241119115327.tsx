import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../../screens/auth/login.screen';
import {createStaticNavigation} from '@react-navigation/native';

const RootStack = createNativeStackNavigator({
  screens: {
    Login: LoginScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

import React from 'react';

export const RootStackComponent = () => {
  return <Navigation />;
};
