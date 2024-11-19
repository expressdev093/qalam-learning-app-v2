import {RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RouteNames} from '../../constants/route.name';

// Root stack
export type HomeStackParamList = {
  [RouteNames.homeDrawer]: undefined;
};

export type HomeStackNavigationProp<T extends keyof HomeStackParamList> =
  NativeStackNavigationProp<HomeStackParamList, T>;

export type HomeStackRouteProp<T extends keyof HomeStackParamList> = RouteProp<
  HomeStackParamList,
  T
>;

export type HomeStackScreenProps<k extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, k>;
