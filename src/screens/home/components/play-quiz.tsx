import {Icon, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../constants/colors';
import {View} from 'react-native-animatable';
import {IQuiz, IUserQuiz} from '../../../interfaces';
import {QuizIcon} from '../../../components/svgs';
import {useAppSelector} from '../../../redux';
import {useList} from '@refinedev/core';
import {QueryContainer} from '../../../components/containers';

type IProps = {};

export const PlayQuizView: React.FC<IProps> = ({}) => {
  const styles = useStyleSheet(themedStyle);
  const {user} = useAppSelector(state => state.auth);

  const userQuizState = useList<IUserQuiz>({
    resource: 'user-quizs',
    queryOptions: {
      enabled: !!user?.id,
    },
    filters: [
      {
        field: 'userId',
        operator: 'eq',
        value: user?.id,
      },
      {
        field: 'isCompleted',
        operator: 'eq',
        value: false,
      },
    ],
    meta: {
      join: [{field: 'answers'}],
    },
  });

  const userQuizes = userQuizState.data?.data;

  const randomUserQuiz = useMemo(() => {
    if (userQuizes && userQuizes?.length > 0) {
      const randomIndex = Math.floor(Math.random() * userQuizes.length);
      return userQuizes[randomIndex];
    }

    return undefined;
  }, [userQuizes]);

  const isQuizFound = randomUserQuiz !== undefined && userQuizState.isFetched;

  const onPlayQuiz = () => {};

  const renderTitle = (
    <View style={styles.titleView}>
      <QuizIcon />
      <Text style={styles.title}>Play Quiz</Text>
    </View>
  );
  return (
    <QueryContainer
      isLoading={userQuizState.isLoading}
      isError={userQuizState.isError}
      error={userQuizState.error}
      isEmpty={false}>
      {isQuizFound && (
        <TouchableOpacity activeOpacity={0.7} onPress={onPlayQuiz}>
          <LinearGradient
            colors={Colors.grandientColor}
            angle={90}
            useAngle
            style={styles.grandientView}>
            <View style={styles.content}>
              <View style={{flex: 1}}>
                {renderTitle}
                {/* <Text style={styles.description}>{quiz?.title}</Text> */}
                <Text style={styles.description}>Title</Text>
              </View>
              <View style={styles.arrowButton}>
                <Icon
                  name="chevron-right-outline"
                  size={28}
                  style={styles.icon}
                />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </QueryContainer>
  );
};

const themedStyle = StyleSheet.create({
  grandientView: {
    height: 100,
    borderRadius: 20,
    marginTop: 20,
  },
  arrowButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    color: 'color-primary-500',
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    color: 'white',
    fontSize: 13,
    marginTop: 3,
  },
});
