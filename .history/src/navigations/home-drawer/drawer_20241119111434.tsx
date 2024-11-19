import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeDrawerParamList} from './types';
import React from 'react';
import {RouteNames} from '../constants/route.name';
import {HomeScreen} from '../../screens/home/home.screen';
import {ProfileScreen} from '../../screens/profile/profile.screen';

const {Navigator, Screen} = createDrawerNavigator<HomeDrawerParamList>();

export const HomeDrawer = ({}) => {
  return (
    <Navigator
      screenOptions={
        {
          //headerShown: false,
          // headerShadowVisible: false,
        }
      }
      backBehavior="initialRoute">
      <Screen name={RouteNames.homeTabar} component={HomeScreen} />
      <Screen name={RouteNames.profile} component={ProfileScreen} />
    </Navigator>
  );
};
