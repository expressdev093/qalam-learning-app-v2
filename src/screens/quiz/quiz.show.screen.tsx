/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {useCreate, useList} from '@refinedev/core';
import {IQuizMcq, IQuizMCQAnswer, IUserQuizAnswer} from '../../interfaces';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/colors';
import {CustomProgressBar} from '../../components/progressbars';
import {QuizMcqItem} from './components/quiz-mcq.item';
import {useAppSelector} from '../../redux';
import {LoadingButton} from '../../components/buttons';

export const QuizShowScreen: React.FC<
  RootStackScreenProps<RouteNames.quizShow>
> = ({navigation, route}) => {
  const {token} = useAppSelector(state => state.auth);
  const [isNextDisable, setNextDisable] = useState<boolean>(true);
  const {
    params: {quizId, userQuizId, answers},
  } = route;
  const defaultAnswers = answers || [];
  const {width} = useWindowDimensions();
  const styles = useStyleSheet(themedStyle);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const userQuizAnswerMutation = useCreate<IUserQuizAnswer>({});
  const quziMcqState = useList<IQuizMcq>({
    resource: 'quiz-mcqs',
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
    pagination: {
      mode: 'off',
    },
  });

  const quizMcqs: IQuizMcq[] = quziMcqState.data?.data || [];
  const totalItems = quizMcqs.length;
  const lastItem = totalItems - 1;

  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if (currentIndex < quizMcqs.length - 1) {
      slidesRef?.current?.scrollToIndex({index: currentIndex + 1});
      setNextDisable(true);
    } else {
      navigation.navigate(RouteNames.quizResult, {
        userQuizId,
      });
    }
  };

  const progressPercent = (((currentIndex + 1) / totalItems) * 100) / 100;

  const onQuizAnswered = async (_quizMcqAnswers: IQuizMCQAnswer) => {
    userQuizAnswerMutation.mutateAsync(
      {
        resource: 'user-quiz-answers',
        values: {
          userQuizId,
          selectedOptionId: _quizMcqAnswers.answerOption.id,
          isCorrect: _quizMcqAnswers.answerOption.isCorrect,
        },
        meta: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
      {
        onSuccess: () => {
          setNextDisable(false);
        },
      },
    );
    // try {
    // const result = await createUserQuizAnswer({
    //   userQuizId,
    //   selectedOptionId: _quizMcqAnswers.answerOption.id,
    //   isCorrect: _quizMcqAnswers.answerOption.isCorrect,
    // }).unwrap();
    //   setNextDisable(false);
    // } catch (err) {
    //   reactotron.log?.('QuizShowScreen', err);
    // }
  };

  const onAnswerdCallback = useCallback(onQuizAnswered, [currentIndex]);

  useEffect(() => {
    if (currentIndex < defaultAnswers.length) {
      setNextDisable(false);
    }
  }, [defaultAnswers, currentIndex]);

  return (
    <LinearGradient
      style={styles.gradientContainer}
      colors={Colors.grandientColor}
      useAngle
      angle={90}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <View style={[styles.numberBox, styles.whiteBox]}>
          <Text style={styles.whiteText}>{currentIndex + 1}</Text>
        </View>
        <CustomProgressBar
          progress={progressPercent}
          width={width - 40 - 100 - 50}
          height={5}
          color="#fff"
        />
        <View style={[styles.numberBox, styles.secondary3Box]}>
          <Text style={styles.whiteText}>{totalItems}</Text>
        </View>
        {/* <Paginator slides={slides} scrollX={scrollX} /> */}
      </View>

      <View style={{flex: 1}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled={false}
          bounces={false}
          data={quizMcqs}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <QuizMcqItem
              index={index}
              quizMcq={item}
              total={quizMcqs.length}
              onAnswerdCallback={onAnswerdCallback}
              defaultSelectedOption={
                index < defaultAnswers.length
                  ? defaultAnswers[index]
                  : undefined
              }
            />
          )}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>
      <View style={styles.footer}>
        <LoadingButton
          loading={userQuizAnswerMutation.isLoading}
          style={{width: '80%'}}
          onPress={scrollTo}
          disabled={isNextDisable}>
          Next
        </LoadingButton>
      </View>
    </LinearGradient>
  );
};

const themedStyle = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    //padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 150,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  numberBox: {
    height: 50,
    width: 50,

    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteBox: {
    backgroundColor: '#FFFFFF70',
  },
  whiteText: {
    color: 'white',
  },
  secondary3Box: {
    backgroundColor: 'color-secondary-3',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
