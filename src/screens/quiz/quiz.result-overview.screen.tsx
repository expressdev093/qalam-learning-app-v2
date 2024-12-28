import {Button, Layout, Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/colors';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import {Utils} from '../../constants/utils';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {useOne} from '@refinedev/core';
import {IUserQuiz} from '../../interfaces';
import {Icon} from '../../components/icon';
import {quizResultOverViewCardImage} from '../../components/svgs';
import CircularProgress from 'react-native-circular-progress-indicator';
import {QuizResultAnswerListVertical} from './list/quiz-result-answers';

export const QuizResultOverviewScreen: React.FC<
  RootStackScreenProps<RouteNames.quizResultOverview>
> = ({route, navigation}) => {
  const {
    params: {userQuizId},
  } = route;
  const styles = useStyleSheet(themedStyle);

  const userQuizState = useOne<IUserQuiz>({
    resource: 'user-quizs',
    id: userQuizId,
    meta: {
      join: [
        {
          field: 'quiz',
        },
        {
          field: 'quiz.mcqs',
        },
        {
          field: 'quiz.mcqs.options',
        },
        {
          field: 'answers',
        },
        {field: 'answers.selectedOption'},
      ],
    },
  });

  const userQuiz = userQuizState.data?.data;
  const quiz = userQuiz?.quiz;
  const answers = userQuiz?.answers || [];
  const mcqs = userQuiz?.quiz?.mcqs || [];
  const totalMcqs = mcqs.length;
  const correctAnswersCount = answers?.filter(a => a.isCorrect).length;

  const onDonePress = () => {
    const resetAction = CommonActions.reset({
      index: 0, // The index of the screen you want to navigate to (in this case, the home page)
      routes: [{name: RouteNames.homeDrawer}], // The screen you want to navigate to
    });

    navigation.dispatch(resetAction);
  };

  const renderPuzzleIcon = (
    <View style={styles.puzzleIconBox}>
      <Icon
        name="puzzle-outline"
        pack="material-community"
        size={28}
        color="white"
      />
    </View>
  );
  return (
    <Layout style={styles.container}>
      <LinearGradient
        style={styles.card}
        colors={Colors.grandientColor}
        useAngle
        angle={90}>
        <View style={styles.cardHeaderView}>
          <View style={styles.cardHeaderTitleView}>
            <Text style={styles.quizNameLabel}>
              {Utils.capitalizeFirstWord(quiz?.type)}
            </Text>
            <Text style={styles.quizName}>{quiz?.title}</Text>
          </View>
          {renderPuzzleIcon}
        </View>
        <ImageBackground
          resizeMode="stretch"
          source={quizResultOverViewCardImage}
          style={styles.resultCard}>
          <View style={styles.resultCardContent}>
            <View style={{flex: 1}}>
              <CircularProgress
                value={correctAnswersCount}
                radius={50}
                duration={2000}
                progressValueColor={'#fff'}
                progressValueStyle={{
                  fontWeight: '500',
                  color: 'yellow',
                  fontSize: 17,
                }}
                maxValue={totalMcqs}
                inActiveStrokeOpacity={0.5}
                activeStrokeWidth={20}
                inActiveStrokeWidth={15}
                activeStrokeColor="#fff"
                valueSuffix={`/${totalMcqs}`}
                titleColor={'white'}
                titleStyle={{fontWeight: 'bold'}}
              />
            </View>
            <Text style={[styles.quizName, {flex: 1}]}>
              You answered {correctAnswersCount} out of {totalMcqs} questions
            </Text>
          </View>
        </ImageBackground>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.heading}>Your Answer</Text>
        <View
          style={{
            backgroundColor: '#DDDDDD',
            borderRadius: 20,
            flex: 1,
            marginBottom: 20,
          }}>
          <QuizResultAnswerListVertical answers={answers} />
        </View>
        <Button onPress={onDonePress}>Done</Button>
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
    height: 230,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingBottom: 0,
  },
  resultCard: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultCardContent: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    paddingVertical: 10,
  },
  cardHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderTitleView: {
    flex: 1,
  },
  quizNameLabel: {
    color: '#ffffff90',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
  },
  quizName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  puzzleIconBox: {
    borderRadius: 15,
    backgroundColor: 'color-secondary-3',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 17,
    fontWeight: '600',
  },
});
