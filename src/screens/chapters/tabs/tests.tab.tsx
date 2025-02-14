import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RouteNames} from '../../../navigations/constants/route.name';
import {ChapterTabScreenProps} from '../tabbar/types';
import {useList} from '@refinedev/core';
import {IQuiz} from '../../../interfaces';
import {ChapterTestListVertical} from '../list/tests/list.vertical';
import {QueryContainer} from '../../../components/containers';
import {RootStackNavigationProp} from '../../../navigations/root/types';
import {useNavigation} from '@react-navigation/native';

export const ChapterTestsTab: React.FC<
  ChapterTabScreenProps<RouteNames.chapterTestsTab>
> = ({navigation, route}) => {
  const rootNavigation = useNavigation<RootStackNavigationProp<any>>();
  const styles = useStyleSheet(themedStyle);
  const {chapterId} = route.params;
  const {data, isLoading, isError, error} = useList<IQuiz>({
    resource: 'quizzes',
    filters: [
      {
        field: 'entityId',
        operator: 'eq',
        value: chapterId,
      },
      {
        field: 'type',
        operator: 'eq',
        value: 'chapters',
      },
      {
        field: 'isActive',
        operator: 'eq',
        value: true,
      },
    ],
  });
  const quizzes = data?.data || [];
  const onItemClick = (quiz: IQuiz) => {
    rootNavigation.navigate(RouteNames.quiz, {
      quizId: quiz.id,
    });
  };
  return (
    <Layout style={styles.container}>
      <QueryContainer
        error={error}
        isError={isError}
        isLoading={isLoading}
        isEmpty={quizzes.length === 0}>
        <View>
          <Text
            style={{
              color: '#000',
              fontSize: 16,
              fontWeight: '600',
              marginVertical: 5,
            }}>
            Choice your course
          </Text>
          <ChapterTestListVertical quizes={quizzes} onItemClick={onItemClick} />
        </View>
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
