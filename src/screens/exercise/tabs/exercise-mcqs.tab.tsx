import React from 'react';
import {StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {IExercise, IMcq} from '../../../interfaces';
import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import {McqsListVertical} from '../../mcqs/list/vertical/list.vertical';
import {useList} from '@refinedev/core';
import {QueryContainer} from '../../../components/containers';

export const ExerciseMcqsTab = () => {
  const styles = useStyleSheet(themedStyle);
  const {
    params: {exerciseId},
  } = useRoute<any>();

  const {data, refetch, isLoading, isError, error} = useList<IMcq>({
    resource: 'mcqs',
    filters: [
      {
        field: 'exerciseId',
        operator: 'eq',
        value: exerciseId,
      },
    ],
    meta: {
      join: [{field: 'options'}],
    },
  });

  const mcqs = data?.data || [];

  return (
    <Layout style={styles.container}>
      <QueryContainer
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={mcqs.length === 0}>
        <McqsListVertical mcqs={mcqs} />
      </QueryContainer>
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
