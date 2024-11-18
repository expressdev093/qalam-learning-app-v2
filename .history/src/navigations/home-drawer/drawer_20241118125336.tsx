import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeDrawerParamList} from './types';
import React from 'react';
import {RootStackScreenProps} from '../root/types';
import {RouteNames} from '../constants/route.name';
import {HomeScreen} from '../../screens/home/home.screen';
import {HomeDrawerContent} from './content';
import {HomeBottomTabBar} from '../tabbars/home/tabbar';

const {Navigator, Screen} = createDrawerNavigator<HomeDrawerParamList>();

export const HomeDrawer = ({}) => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
      drawerContent={HomeDrawerContent}>
      <Screen name={RouteNames.homeTabar} component={HomeBottomTabBar} />
    </Navigator>
  );
};
