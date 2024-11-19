import React from 'react';
import {HomeBottomTabParamList} from './types';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import {RouteNames} from '../../constants/route.name';
import {HomeScreen} from '../../../screens/home/home.screen';
import {Activity, BookSquar, Home, UserSquar} from '../../../components/svgs';
import {ClassesScreen} from '../../../screens/classes/classes.screen';
import {AnalysisScreen} from '../../../screens/analysis/analysis.screen';
import {ProfileScreen} from '../../../screens/profile/profile.screen';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '../../../components/icon';
import {HomeHeader} from './header';

const Tab = createBottomTabNavigator<HomeBottomTabParamList>();

const BottomTabBar = ({state, navigation}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <BottomNavigation
      style={{paddingBottom: insets.bottom, backgroundColor: 'white'}}
      selectedIndex={state.index}
      onSelect={(index: any) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab
        title={RouteNames.home}
        icon={props => <Home {...props} stroke={'red'} />}
      />
      <BottomNavigationTab
        title="Classes"
        icon={props => <BookSquar {...props} stroke={'red'} />}
      />
      <BottomNavigationTab
        title="Analysis"
        icon={props => <Activity {...props} />}
      />

      <BottomNavigationTab
        title="Profile"
        icon={props => <UserSquar {...props} />}
      />
    </BottomNavigation>
  );
};

export const HomeBottomTabBar = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName={RouteNames.homeTab}
      screenOptions={{
        //headerShown: false,
        header(props) {
          return <HomeHeader {...props} />;
        },
      }}
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name={RouteNames.homeTab} component={HomeScreen} />
      <Tab.Screen name={RouteNames.classesTab} component={ClassesScreen} />
      <Tab.Screen name={RouteNames.analysisTab} component={AnalysisScreen} />
      <Tab.Screen name={RouteNames.profileTab} component={ProfileScreen} />
    </Tab.Navigator>
  );
};
