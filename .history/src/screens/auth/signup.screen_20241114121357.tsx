import React from 'react';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';

export const SignUpScreen: React.FC<
  RootStackScreenProps<RouteNames.signUp>
> = ({navigation}) => {
  return <div>SignUpScreen</div>;
};
