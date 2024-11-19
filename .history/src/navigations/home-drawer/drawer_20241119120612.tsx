import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeDrawerParamList} from './types';
import React from 'react';
import {RouteNames} from '../constants/route.name';
import {HomeScreen} from '../../screens/home/home.screen';
import {ProfileScreen} from '../../screens/profile/profile.screen';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export const HomeDrawer = ({}) => {
  return (
    <Drawer.Navigator
      screenOptions={
        {
          //headerShown: false,
          // headerShadowVisible: false,
        }
      }
      initialRouteName={RouteNames.homeTabar}>
      <Drawer.Screen name={RouteNames.homeTabar} component={HomeTabar} />
      <Drawer.Screen name={RouteNames.profile} component={ProfileScreen} />
    </Drawer.Navigator>
  );
};
