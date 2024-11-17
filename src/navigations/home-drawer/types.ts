import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RouteNames} from '../constants/route.name';
import {RouteProp} from '@react-navigation/native';

export type HomeDrawerParamList = {
  [RouteNames.homeTabar]: undefined;
  [RouteNames.profile]: undefined;
  [RouteNames.notifications]: undefined;
  [RouteNames.favorites]: undefined;
  [RouteNames.aboutUs]: undefined;
  [RouteNames.privacyPolicy]: undefined;
  [RouteNames.support]: undefined;
  [RouteNames.settings]: undefined;
};

export type HomeDrawerNavigationProp<T extends keyof HomeDrawerParamList> =
  NativeStackNavigationProp<HomeDrawerParamList, T>;

// Home stack route prop
export type HomeDrawerRouteProp<T extends keyof HomeDrawerParamList> =
  RouteProp<HomeDrawerParamList, T>;

export type HomeDrawerScreenProps<k extends keyof HomeDrawerParamList> =
  NativeStackScreenProps<HomeDrawerParamList, k>;
