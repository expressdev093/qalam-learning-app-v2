import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeDrawerParamList} from './types';
import React from 'react';
import {RouteNames} from '../constants/route.name';
import {HomeScreen} from '../../screens/home/home.screen';
import {ProfileScreen} from '../../screens/profile/profile.screen';
import {HomeBottomTabBar} from '../tabbars/home/tabbar';
import {HomeDrawerContent} from './content';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export const HomeDrawer = ({}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        drawerStyle: {
          width: 200,
        },
      }}
      drawerContent={HomeDrawerContent}
      initialRouteName={RouteNames.homeTabar}>
      <Drawer.Screen name={RouteNames.homeTabar} component={HomeBottomTabBar} />
      <Drawer.Screen name={RouteNames.profile} component={ProfileScreen} />
    </Drawer.Navigator>
  );
};
