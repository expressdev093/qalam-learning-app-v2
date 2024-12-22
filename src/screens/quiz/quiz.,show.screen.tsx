import {Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';

export const QuizShowScreen: React.FC<
  RootStackScreenProps<RouteNames.quizShow>
> = ({navigation, route}) => {
  return (
    <View>
      <Text>QuizShowScreen</Text>
    </View>
  );
};
