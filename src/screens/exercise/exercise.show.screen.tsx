import {useNavigation, useRoute} from '@react-navigation/native';
import {Layout, useStyleSheet} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {useList} from '@refinedev/core';
import {IQuestion} from '../../interfaces';
import {ExerciseQuestionsTabsNavigation} from './tabbar/tabbar';
import {QueryContainer} from '../../components/containers';

export const ExerciseShowScreen: React.FC<
  RootStackScreenProps<RouteNames.exerciseShow>
> = ({navigation, route}) => {
  const {
    params: {exerciseId, title},
  } = route;
  const styles = useStyleSheet(themedStyle);

  const {data, refetch, isLoading, isError, error} = useList<IQuestion>({
    resource: 'questions',
    filters: [
      {
        field: 'exerciseId',
        operator: 'eq',
        value: exerciseId,
      },
    ],
  });

  const questions = data?.data || [];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation, title]);
  return (
    <Layout style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      <View style={styles.content}>
        <QueryContainer
          isError={isError}
          error={error}
          isLoading={isLoading}
          isEmpty={false}>
          <ExerciseQuestionsTabsNavigation
            questions={questions}
            exerciseId={exerciseId}
            type="subject"
          />
        </QueryContainer>
      </View>
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },
});
