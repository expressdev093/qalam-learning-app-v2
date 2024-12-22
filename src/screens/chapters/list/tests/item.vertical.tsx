import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useStyleSheet} from '@ui-kitten/components';
import {Utils} from '../../../../constants/utils';
import {IQuiz} from '../../../../interfaces';

type Props = {
  quiz: IQuiz;
  index: number;
};

export const ItemVertical: React.FC<Props> = ({index, quiz}) => {
  const styles = useStyleSheet(themedStyle);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.black} category="h6">
          {quiz.title}
        </Text>

        <Text style={styles.black} category="p1">
          MCQS
        </Text>
      </View>
      <View style={[styles.box]}>
        <Text category="h6" style={styles.secondrycolor}>
          {index + 1}
        </Text>
        <Text category="p2" style={styles.p}>
          {Utils.capitalizeFirstWord(quiz.type)}
        </Text>
      </View>
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    height: 90,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  playButtonCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  icon: {
    color: 'color-primary-500',
  },
  white: {
    color: 'white',
  },
  black: {
    color: 'rgba(0,0,0,0.7)',
  },
  chapterView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(212,96,76,0.2)',
  },
  p: {
    fontSize: 11,
    color: 'color-secondary',
  },
  secondrycolor: {
    color: 'color-secondary',
  },
});
