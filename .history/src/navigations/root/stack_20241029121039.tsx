import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './types';
import {RouteNames} from '../constants/route.name';
import {LoginScreen} from '../../screens/login/login.screen';
import {HomeScreen} from '../../screens/home/home.screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
        initialRouteName={RouteNames.login}>
        <Stack.Screen name={RouteNames.login} component={LoginScreen} />
        <Stack.Screen name={RouteNames.home} component={HomeScreen} />
      </Stack.Navigator>
    </React.Fragment>
  );
};
