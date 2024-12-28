import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RouteNames} from '../constants/route.name';
import {RouteProp} from '@react-navigation/native';
import {WebsiteContentType} from '../../interfaces/enum';

export type HomeDrawerParamList = {
  [RouteNames.homeTabar]: undefined;
  [RouteNames.homeDrawerProfile]: {statusBarBackgroundColor?: string};
  [RouteNames.notifications]: undefined;
  [RouteNames.favorites]: undefined;
  [RouteNames.aboutUs]: {type: WebsiteContentType};
  [RouteNames.privacyPolicy]: {type: WebsiteContentType};
  [RouteNames.support]: {type: WebsiteContentType};
  [RouteNames.settings]: undefined;
};

export type HomeDrawerNavigationProp<T extends keyof HomeDrawerParamList> =
  NativeStackNavigationProp<HomeDrawerParamList, T>;

// Home stack route prop
export type HomeDrawerRouteProp<T extends keyof HomeDrawerParamList> =
  RouteProp<HomeDrawerParamList, T>;

export type HomeDrawerScreenProps<k extends keyof HomeDrawerParamList> =
  NativeStackScreenProps<HomeDrawerParamList, k>;
