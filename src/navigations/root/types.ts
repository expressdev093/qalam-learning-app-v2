import {RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RouteNames} from '../constants/route.name';

// Root stack
export type RootStackParamList = {
  [RouteNames.login]: undefined;
  [RouteNames.signUp]: undefined;
  [RouteNames.homeDrawer]: undefined;
  [RouteNames.forgotPassword]: undefined;
};

// Root stack navigation prop
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

// Root stack route prop
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type RootStackScreenProps<k extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, k>;
