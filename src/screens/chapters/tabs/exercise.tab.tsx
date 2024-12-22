import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ChapterTabScreenProps} from '../tabbar/types';
import {RouteNames} from '../../../navigations/constants/route.name';
import {useList} from '@refinedev/core';
import {IExercise} from '../../../interfaces';
import {ExerciseListVertical} from '../../exercise/list/vertical/list.vertical';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../../navigations/root/types';
import {QueryContainer} from '../../../components/containers';

export const ChapterExerciseTab: React.FC<
  ChapterTabScreenProps<RouteNames.chapterExerciseTab>
> = ({navigation, route}) => {
  const rootNavigation =
    useNavigation<RootStackNavigationProp<RouteNames.homeDrawer>>();
  const styles = useStyleSheet(themedStyle);
  const {chapterId} = route.params;
  const {data, isError, error, isLoading} = useList<IExercise>({
    resource: 'exercises',
    filters: [
      {
        field: 'chapterId',
        operator: 'eq',
        value: chapterId,
      },
      {
        field: 'isActive',
        operator: 'eq',
        value: true,
      },
    ],
  });
  const exercises = data?.data || [];

  const onExerciseItemClick = (exercise: IExercise) => {
    rootNavigation.navigate(RouteNames.exerciseShow, {
      exerciseId: exercise.id,
      title: exercise.title,
    });
  };

  return (
    <Layout style={styles.container}>
      <QueryContainer
        isError={isError}
        isEmpty={exercises.length === 0}
        isLoading={isLoading}
        error={error}>
        <ExerciseListVertical
          exercises={exercises}
          onExerciseItemClick={onExerciseItemClick}
        />
      </QueryContainer>
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});
