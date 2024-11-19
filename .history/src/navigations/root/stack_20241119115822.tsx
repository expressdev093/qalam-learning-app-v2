import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {RootStackParamList} from './types';
import {RouteNames} from '../constants/route.name';
import {LoginScreen} from '../../screens/auth/login.screen';
import {ForgotPasswordScreen} from '../../screens/forgot-password/forgot-password.screen';
import {SignUpScreen} from '../../screens/auth/signup.screen';
import {HomeDrawer} from '../home-drawer/drawer';
import {Alert, BackHandler} from 'react-native';
import {HomeStack} from '../stack/home/stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={RouteNames.login}>
        <Stack.Screen name={RouteNames.login} component={LoginScreen} />
        <Stack.Screen name={RouteNames.signUp} component={SignUpScreen} />
        <Stack.Screen
          name={RouteNames.forgotPassword}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name={RouteNames.homeStack} component={HomeStack} />
      </Stack.Navigator>
    </React.Fragment>
  );
};
