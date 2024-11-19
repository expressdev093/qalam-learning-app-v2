import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../../screens/auth/login.screen';
import {createStaticNavigation} from '@react-navigation/native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '../../screens/home/home.screen';
import {ProfileScreen} from '../../screens/profile/profile.screen';

const MyDrawer = createDrawerNavigator({
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
    },
    HomeDrawer: {
      screen: MyDrawer,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export const RootStackComponent = () => {
  return <Navigation />;
};
