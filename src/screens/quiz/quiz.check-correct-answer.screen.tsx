import {Layout, useStyleSheet, useTheme} from '@ui-kitten/components';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {useList} from '@refinedev/core';
import {IQuizMcq} from '../../interfaces';
import {QueryContainer} from '../../components/containers';
import {emptyImage} from '../../components/svgs';
import {QuizCorrectAnswerListVertical} from './list/quiz-correct-answers';
import {ThemeColorKey} from '../../constants/colors';

export const QuizCheckCorrectAnswerScreen: React.FC<
  RootStackScreenProps<RouteNames.quizCheckCorrectAnswer>
> = ({route, navigation}) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyle);
  const {
    params: {quizId},
  } = route;

  const quizMcqState = useList<IQuizMcq>({
    resource: 'quiz-mcqs',
    pagination: {
      mode: 'off',
    },
    filters: [
      {
        field: 'quizId',
        operator: 'eq',
        value: quizId,
      },
    ],
    meta: {
      join: [{field: 'options'}],
    },
  });

  const mcqs = quizMcqState.data?.data || [];
  const correctAnswers = mcqs
    ?.map(mcq => mcq.options.filter(op => op.isCorrect))
    .flatMap(innerArray => innerArray);

  console.log(quizId, mcqs);

  return (
    <Layout style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme[ThemeColorKey.backgroundBasicColor1]}
      />
      <QueryContainer
        error={quizMcqState.error}
        isError={quizMcqState.isError}
        isLoading={quizMcqState.isLoading}
        isEmpty={mcqs.length === 0}
        emptyViewProps={{
          title: 'No mcqs answers found added.',
          imageSource: emptyImage,
        }}>
        <View
          style={{
            backgroundColor: '#DDDDDD',
            borderRadius: 20,
            flex: 1,
            marginBottom: 20,
          }}>
          <QuizCorrectAnswerListVertical answers={correctAnswers} />
        </View>
      </QueryContainer>
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
