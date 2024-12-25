import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useStyleSheet} from '@ui-kitten/components';
import {Icon} from '../../../../components/icon';
import {Colors} from '../../../../constants/colors';
import {IUserQuizAnswer} from '../../../../interfaces';

type Props = {
  userQuizAnswer: IUserQuizAnswer;
  index: number;
};

export const QuizAnswerItemVertical: React.FC<Props> = ({
  userQuizAnswer,
  index,
}) => {
  const styles = useStyleSheet(themedStyle);

  return (
    <View style={styles.container}>
      <View style={styles.numberBox}>
        <Text>{index + 1}</Text>
      </View>
      <Text style={styles.text}>{userQuizAnswer.selectedOption?.text}</Text>

      {userQuizAnswer.isCorrect ? (
        <Icon name="checkcircleo" pack="antdesign" size={24} color={'green'} />
      ) : (
        <Icon
          name="info"
          pack="simple-line"
          size={24}
          color={Colors.secondary}
        />
      )}
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    minHeight: 40,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  numberBox: {
    borderRadius: 30,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
  },
});
