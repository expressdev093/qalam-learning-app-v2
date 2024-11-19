import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeStackParamList} from './types';
import {RouteNames} from '../../constants/route.name';
import {HomeDrawer} from '../../home-drawer/drawer';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={RouteNames.homeDrawer} component={HomeDrawer} />
    </Stack.Navigator>
  );
};
