import React, {Fragment} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useStyleSheet} from '@ui-kitten/components';
import {PlatformPressable} from '@react-navigation/elements';
import {useRoute} from '@react-navigation/native';
import {IMcq} from '../../../../interfaces';
import {ExpandableView} from '../../../../components/expandable-view';
import {McqOptionItem} from './mcq-option.item';
import {McqDetailAnswerView} from './mcq-detail-answer.view';

type Props = {
  mcq: IMcq;
};

export const McqItemVertical: React.FC<Props> = ({mcq}) => {
  const styles = useStyleSheet(themedStyle);
  const correctOption = mcq.options?.find(option => option.isCorrect);

  return (
    <View style={styles.container}>
      <ExpandableView title={mcq.text}>
        <View>
          {mcq.options?.map(option => (
            <McqOptionItem option={option} />
          ))}
          <McqDetailAnswerView option={correctOption} />
        </View>
      </ExpandableView>
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {},
});
