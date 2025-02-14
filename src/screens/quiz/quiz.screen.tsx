import {Text, useStyleSheet} from '@ui-kitten/components';
import React, {Fragment} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Colors} from '../../constants/colors';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import LinearGradient from 'react-native-linear-gradient';
import BackHeaderButton from '../../components/buttons/back-header.button';
import {quizHeaderIllustration} from '../../components/svgs';
import {Utils} from '../../constants/utils';
import {useCreate, useOne} from '@refinedev/core';
import {IQuiz, IUserQuiz} from '../../interfaces';
import {QueryContainer} from '../../components/containers';
import {Icon} from '../../components/icon';
import HtmlView from '../../components/htmlview/html.view';
import {LoadingButton} from '../../components/buttons';
import {useAppSelector} from '../../redux';

const {height, width} = Dimensions.get('window');

export const QuizScreen: React.FC<RootStackScreenProps<RouteNames.quiz>> = ({
  route,
  navigation,
}) => {
  const {user, token} = useAppSelector(state => state.auth);
  const {quizId, userQuiz} = route.params;
  const styles = useStyleSheet(themedStyle);
  const {mutateAsync: createUserQuizAsync, isLoading: isCreatingQuiz} =
    useCreate<IUserQuiz>();
  const quizState = useOne<IQuiz>({
    resource: 'quizzes',
    id: quizId,
  });

  const quiz = quizState.data?.data;

  const handleBackButton = () => {
    navigation.goBack();
  };

  const onHandlePlay = async () => {
    if (userQuiz) {
      navigation.navigate(RouteNames.quizShow, {
        quizId: quizId,
        userQuizId: userQuiz.id,
        answers: userQuiz.answers,
      });
    } else {
      createUserQuizAsync(
        {
          resource: 'user-quizs',
          values: {
            isCompleted: false,
            passingScore: quiz?.passingScore,
            totalScore: 0,
            correctAnswers: 0,
            inCorrectAnswers: 0,
            userId: user?.id,
            quizId: quizId,
          },
          meta: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        },
        {
          onSuccess: data => {
            navigation.navigate(RouteNames.quizShow, {
              quizId: quizId,
              userQuizId: data.data.id,
            });
          },
        },
      );
    }
  };

  return (
    <LinearGradient
      colors={Colors.grandientColor}
      useAngle
      angle={90}
      style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View
        style={{
          padding: 20,
          ...Platform.select({
            ios: {
              marginTop: 20,
            },
          }),
        }}>
        <BackHeaderButton color={'#fff'} onPress={handleBackButton} />
      </View>
      <Image
        source={quizHeaderIllustration}
        style={styles.headerImage as any}
        resizeMode="contain"
        resizeMethod="resize"
      />
      <View style={styles.card}>
        <QueryContainer
          isLoading={quizState.isLoading}
          isError={quizState.isError}
          error={quizState.error}
          isEmpty={quizState.isFetched && quiz === undefined}>
          <View style={{flex: 1}}>
            <Text category="s1" style={styles.type}>
              {quiz?.type}
            </Text>
            <Text category="h5" style={styles.title}>
              {quiz?.title}
            </Text>
            <View style={styles.quizInfoView}>
              <View style={styles.quizInfoIcon}>
                <Icon
                  name="help"
                  pack="material-community"
                  size={24}
                  color="white"
                />
              </View>
              <Text style={styles.quizInfotext}>Questions</Text>
              <Text
                style={{
                  color: 'rgba(0, 0, 0, 0.7)',
                  fontSize: 13,
                  fontWeight: '400',
                }}>
                {quiz?.totalTime || 0} Minutes
              </Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.heading}>DESCRIPTION</Text>
              <ScrollView
                style={{flex: 1, marginBottom: 10}}
                showsVerticalScrollIndicator={false}>
                <HtmlView html={quiz?.description} />
              </ScrollView>
              <LoadingButton loading={isCreatingQuiz} onPress={onHandlePlay}>
                Play
              </LoadingButton>
            </View>
          </View>
        </QueryContainer>
      </View>
    </LinearGradient>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 230,
  },
  card: {
    height: height - 300,
    width: width - 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    padding: 20,
  },
  quizInfoView: {
    backgroundColor: `${Colors.secondary3}30`,
    flexDirection: 'row',
    height: 70,
    borderRadius: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  quizInfoIcon: {
    backgroundColor: 'color-secondary-3',
    padding: 5,
    borderRadius: 20,
  },
  quizInfotext: {
    flex: 1,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    marginTop: 20,
    flex: 1,
  },
  heading: {
    color: '#858494',
    letterSpacing: 2,
  },
  p: {
    marginTop: 10,
    fontSize: 16,
    flex: 1,
  },
  type: {color: '#858494', textTransform: 'uppercase', fontSize: 14},
  title: {color: '#0C092A', fontWeight: 'bold', fontSize: 20},
});
