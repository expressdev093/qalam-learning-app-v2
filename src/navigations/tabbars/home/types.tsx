import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RouteNames} from '../../constants/route.name';

export type HomeBottomTabParamList = {
  [RouteNames.homeTab]: undefined;
  [RouteNames.classesTab]: undefined;
  [RouteNames.analysisTab]: undefined;
  [RouteNames.profileTab]: undefined;
};

// BottomTab stack navigation prop
export type HomeBottomTabNavigationProp<
  T extends keyof HomeBottomTabParamList,
> = NativeStackNavigationProp<HomeBottomTabParamList, T>;

// BottomTab stack route prop
export type HomeBottomTabRouteProp<T extends keyof HomeBottomTabParamList> =
  RouteProp<HomeBottomTabParamList, T>;

export type HomeBottomTaScreenProps<k extends keyof HomeBottomTabParamList> =
  NativeStackScreenProps<HomeBottomTabParamList, k>;
