import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {IQuestion} from '../../../interfaces';
import {Layout, useStyleSheet} from '@ui-kitten/components';
import {QuestionsListVertical} from '../../questions/list/vertical/list.vertical';
import {RootStackNavigationProp} from '../../../navigations/root/types';
import {RouteNames} from '../../../navigations/constants/route.name';

type IProps = {
  type: 'video' | 'subject';
};

export const ExerciseQuestionTab: React.FC<IProps> = ({type}) => {
  const styles = useStyleSheet(themedStyle);
  const {
    params: {questions: data},
  } = useRoute<any>();
  const navigation = useNavigation<RootStackNavigationProp<any>>();
  const questions: IQuestion[] = data ?? [];

  const onItemClick = (question: IQuestion) => {
    navigation.navigate(RouteNames.questionShow, {question});
  };
  return (
    <Layout style={styles.container}>
      <QuestionsListVertical questions={questions} onItemClick={onItemClick} />
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
