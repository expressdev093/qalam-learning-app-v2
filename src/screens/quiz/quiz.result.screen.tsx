/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Layout,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, ThemeColorKey} from '../../constants/colors';
import {CommonActions} from '@react-navigation/native';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {useOne, useUpdate} from '@refinedev/core';
import {IUserQuiz} from '../../interfaces';
import {useAppSelector} from '../../redux';
import {lineChartImage, quizResultImage} from '../../components/svgs';

const StateView: React.FC<{label: string; value: string}> = ({
  label,
  value,
}) => {
  const styles = useStyleSheet(themedStyle);

  return (
    <View style={styles.stateView}>
      <Text style={styles.stateLabel}>{label}</Text>
      <Text style={styles.stateValue} category="h6">
        {value}
      </Text>
    </View>
  );
};

export const QuizResultScreen: React.FC<
  RootStackScreenProps<RouteNames.quizResult>
> = ({route, navigation}) => {
  const {
    params: {userQuizId},
  } = route;
  const theme = useTheme();
  const {token} = useAppSelector(state => state.auth);
  const userQuizMutation = useUpdate<IUserQuiz>({});
  // const [updateUserQuiz, {error, isError, isSuccess, isLoading}] =
  //   Api.useUpdateUserQuizMutation();

  const userQuizState = useOne<IUserQuiz>({
    resource: 'user-quizs',
    id: userQuizId,
    meta: {
      join: [
        {field: 'quiz'},
        {field: 'quiz.mcqs'},
        {field: 'quiz.mcqs.options'},
        {field: 'answers'},
        {field: 'answers.selectedOption'},
      ],
    },
  });

  const userQuiz = userQuizState.data?.data;

  const totalQuestions = userQuiz?.quiz?.mcqs?.length || 0;

  // Calculate the number of correct answers
  const correctAnswers = userQuiz?.answers ?? [];

  const correctAnswersLength = correctAnswers.filter(a => a.isCorrect).length;
  const inCorrectAnswersLength = correctAnswers.filter(
    a => !a.isCorrect,
  ).length;
  // quizMcqAnswers.filter(
  //   item => item.isAnswerCorrect,
  // ).length;

  // Calculate the correct answer percentage
  const correctPercentage = (correctAnswersLength / totalQuestions) * 100;
  const styles = useStyleSheet(themedStyle);

  useEffect(() => {
    if (userQuizId && userQuiz && userQuiz.isCompleted === false) {
      updateQuizStatus();
    }
  }, [userQuiz, userQuizId]);

  const updateQuizStatus = async () => {
    await userQuizMutation.mutate(
      {
        resource: 'user-quizs',
        id: userQuizId,
        values: {
          isCompleted: true,
        },
        meta: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
      {
        onSuccess: () => {
          if (userQuiz) {
            userQuiz.isCompleted = true;
          }
        },
      },
    );
  };

  const onDonePress = () => {
    const resetAction = CommonActions.reset({
      index: 0, // The index of the screen you want to navigate to (in this case, the home page)
      routes: [{name: RouteNames.homeDrawer}], // The screen you want to navigate to
    });

    navigation.dispatch(resetAction);
  };

  const onCheckCorrectAnswerPress = () => {
    navigation.navigate(RouteNames.quizCheckCorrectAnswer, {
      quizId: userQuiz?.quizId!,
    });
  };

  return (
    <Layout style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme[ThemeColorKey.backgroundBasicColor1]}
      />
      <LinearGradient
        style={styles.card}
        colors={Colors.grandientColor}
        useAngle
        angle={90}>
        <Image
          source={quizResultImage}
          resizeMode="contain"
          style={styles.resultImage as any}
        />
        <Text style={styles.pointsText} category="h6">
          You get {correctPercentage}% Quiz Points
        </Text>
        <Button size="large" onPress={onCheckCorrectAnswerPress}>
          Check Correct Answer
        </Button>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.stateLabel}>Accuration Answer</Text>
        <Image source={lineChartImage} resizeMode="contain" />
        <View style={styles.row}>
          <StateView
            label="CORRECT ANSWER"
            value={`${correctAnswersLength} questions`}
          />
          <StateView label="COMPLETION" value="100%" />
        </View>
        <View style={styles.row}>
          <StateView label="Skipped" value="0" />
          <StateView
            label="INCORRECT ANSWER"
            value={'' + inCorrectAnswersLength}
          />
        </View>
        <View style={styles.row}>
          <Button appearance="outline" style={{flex: 1}} onPress={onDonePress}>
            Done
          </Button>
          <View style={{width: 20}} />
          <Button
            style={{flex: 1}}
            onPress={() =>
              navigation.navigate(RouteNames.quizResultOverview, {
                userQuizId,
              })
            }>
            Review
          </Button>
        </View>
      </View>
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  content: {
    flex: 1.5,
    paddingVertical: 10,
  },
  stateView: {
    flex: 1,
  },
  stateLabel: {
    color: '#858494',
    letterSpacing: 2,
    fontSize: 16,
  },
  stateValue: {
    color: '#0C092A',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  resultImage: {
    flex: 3,
  },
  pointsText: {
    color: 'white',
    flex: 1,
  },
});
