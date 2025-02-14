import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import HtmlView from '../../components/htmlview/html.view';

export const QuestionShowScreen: React.FC<
  RootStackScreenProps<RouteNames.questionShow>
> = ({route}) => {
  const {
    params: {question},
  } = route;
  const styles = useStyleSheet(themedStyle);
  return (
    <Layout style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Text category="h6">{question.text}</Text>
      <HtmlView html={question.answer} />
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  paragraph: {
    marginTop: 10,
    fontSize: 16,
  },
});
