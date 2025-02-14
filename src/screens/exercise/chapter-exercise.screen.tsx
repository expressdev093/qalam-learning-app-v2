import React from 'react';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {useList, useOne} from '@refinedev/core';
import {IExercise} from '../../interfaces';
import {QueryContainer} from '../../components/containers';
import {ExerciseQuestionsTabsNavigation} from './tabbar/tabbar';
import {emptyImage} from '../../components/svgs';

export const ChapterExerciseScreen: React.FC<
  RootStackScreenProps<RouteNames.chapterExerciseShow>
> = ({route, navigation}) => {
  const {chapterId} = route.params;
  const exerciseState = useList<IExercise>({
    pagination: {
      pageSize: 1,
    },
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
    meta: {
      join: [
        {
          field: 'questions',
        },
        {field: 'mcqs'},
        {field: 'mcqs.options'},
      ],
    },
  });

  const exercises = exerciseState.data?.data || [];

  return (
    <Layout style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <View style={styles.content}>
        <QueryContainer
          error={exerciseState.error}
          isError={exerciseState.isError}
          isLoading={exerciseState.isLoading}
          isEmpty={exercises?.length === 0}
          emptyViewProps={{
            title: 'No Exercise found',
            imageSource: emptyImage,
          }}>
          {exercises.length > 0 && (
            <ExerciseQuestionsTabsNavigation
              questions={exercises[0].questions ?? []}
              exerciseId={exercises[0].id}
              type="video"
            />
          )}
        </QueryContainer>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
