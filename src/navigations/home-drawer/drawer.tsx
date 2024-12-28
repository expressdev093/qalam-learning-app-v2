import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeDrawerParamList} from './types';
import React from 'react';
import {RouteNames} from '../constants/route.name';
import {HomeScreen} from '../../screens/home/home.screen';
import {ProfileScreen} from '../../screens/profile/profile.screen';
import {HomeBottomTabBar} from '../tabbars/home/tabbar';
import {HomeDrawerContent} from './content';
import {useWindowDimensions} from 'react-native';
import {NotificationScreen} from '../../screens/notifications/notifications.screen';
import {FavoriteScreen} from '../../screens/favorites/favorites.screen';
import {AboutUsScreen} from '../../screens/about-us/about-us.screen';
import {WebsiteContentType} from '../../interfaces/enum';
import {SettingsScreen} from '../../screens/settings/settings.screen';

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
      drawerContent={HomeDrawerContent}
      initialRouteName={RouteNames.homeTabar}>
      <Drawer.Screen name={RouteNames.homeTabar} component={HomeBottomTabBar} />
      <Drawer.Screen
        name={RouteNames.homeDrawerProfile}
        component={ProfileScreen}
        options={{headerShown: true, title: 'Profile'}}
        initialParams={{
          statusBarBackgroundColor: '#fff',
        }}
      />
      <Drawer.Screen
        name={RouteNames.notifications}
        component={NotificationScreen}
        options={{headerShown: true}}
      />
      <Drawer.Screen
        name={RouteNames.favorites}
        component={FavoriteScreen}
        options={{headerShown: true}}
      />
      <Drawer.Screen
        name={RouteNames.aboutUs}
        component={AboutUsScreen}
        options={{headerShown: true}}
        initialParams={{type: WebsiteContentType.About}}
      />

      <Drawer.Screen
        name={RouteNames.privacyPolicy}
        component={AboutUsScreen}
        options={{headerShown: true}}
        initialParams={{type: WebsiteContentType.PrivacyPolicy}}
      />
      <Drawer.Screen
        name={RouteNames.support}
        component={AboutUsScreen}
        options={{headerShown: true}}
        initialParams={{type: WebsiteContentType.Support}}
      />
      <Drawer.Screen
        name={RouteNames.settings}
        component={SettingsScreen}
        options={{headerShown: true}}
      />
    </Drawer.Navigator>
  );
};
