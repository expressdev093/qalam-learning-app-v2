import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeDrawerParamList} from './types';
import React from 'react';
import {RouteNames} from '../constants/route.name';
import {HomeScreen} from '../../screens/home/home.screen';
import {ProfileScreen} from '../../screens/profile/profile.screen';
import {HomeBottomTabBar} from '../tabbars/home/tabbar';
import {HomeDrawerContent} from './content';
import {useWindowDimensions} from 'react-native';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export const HomeDrawer = ({}) => {
  const {width} = useWindowDimensions();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        drawerStyle: {
          width: width * 0.8,
          borderRadius: 0,
        },
        drawerType: width >= 768 ? 'permanent' : 'front',
        //drawerHideStatusBarOnOpen: true,
        //drawerStatusBarAnimation: 'fade',
      }}
      drawerContentStyle={{}}
      drawerContent={HomeDrawerContent}
      initialRouteName={RouteNames.homeTabar}>
      <Drawer.Screen name={RouteNames.homeTabar} component={HomeBottomTabBar} />
      <Drawer.Screen name={RouteNames.profile} component={ProfileScreen} />
    </Drawer.Navigator>
  );
};
