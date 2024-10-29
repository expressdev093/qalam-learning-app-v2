import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteNames} from '../constants/route.name';

// Root stack
export type RootStackParamList = {
  [RouteNames.login]: undefined;
  [RouteNames.homeStack]: undefined;
};

// Root stack navigation prop
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

// Root stack route prop
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
