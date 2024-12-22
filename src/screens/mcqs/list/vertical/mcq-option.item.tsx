import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Radio, useStyleSheet} from '@ui-kitten/components';
import {IMcqOption} from '../../../../interfaces';

type IProps = {
  option: IMcqOption;
};

export const McqOptionItem: React.FC<IProps> = ({option}) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <View style={styles.container}>
      <Radio checked={option.isCorrect}>{option.text}</Radio>
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
});
