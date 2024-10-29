import {RouteProp} from '@react-navigation/native';
import {RouteNames} from '../route-names';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Root stack
export type RootStackParamList = {
  [RouteNames.authStack]: undefined;
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
