import {Button, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IMcqOption} from '../../../../interfaces';
type IProps = {
  option?: IMcqOption;
};

export const McqDetailAnswerView: React.FC<IProps> = ({option}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const styles = useStyleSheet(themedStyle);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button
          appearance="ghost"
          size="tiny"
          style={styles.buttonStyle}
          onPress={() => setVisible(!visible)}>
          View Detail Answer
        </Button>
      </View>
      {visible && <Text category="c1">{option?.detailAnswer ?? ''}</Text>}
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {},
  buttonStyle: {
    width: 150,
  },
});
