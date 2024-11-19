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
import {Home} from '../../../components/svgs';
import {HomeDrawerScreenProps} from '../../home-drawer/types';
import {ClassesScreen} from '../../../screens/classes/classes.screen';
import {AnalysisScreen} from '../../../screens/analysis/analysis.screen';
import {ProfileScreen} from '../../../screens/profile/profile.screen';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator<HomeBottomTabParamList>();

const BottomTabBar = ({state}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <BottomNavigation
      style={{paddingBottom: insets.bottom, backgroundColor: 'white'}}
      selectedIndex={state.index}
      onSelect={(index: any) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab
        title={RouteNames.home}
        // icon={props => <Home {...props} />}
      />
      <BottomNavigationTab
        title="Classes"
        // icon={props => <BookSquar {...props} stroke={'red'} />}
      />
      <BottomNavigationTab
        title="Analysis"
        // icon={props => <Activity {...props} />}
      />

      <BottomNavigationTab
        title="Profile"
        // icon={props => <UserSquar {...props} />}
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
        headerShown: false,
      }}
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name={RouteNames.homeTab} component={HomeScreen} />
      <Tab.Screen name={RouteNames.classesTab} component={ClassesScreen} />
      <Tab.Screen name={RouteNames.analysisTab} component={AnalysisScreen} />
      <Tab.Screen name={RouteNames.profileTab} component={ProfileScreen} />
    </Tab.Navigator>
  );
};
