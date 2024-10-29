import {StyleService, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {View, Text} from 'react-native';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';

export const HorizontalLineWithText: React.FC<{text: string} & ViewProps> = ({
  text,
  style,
  ...rest
}) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <View {...rest} style={[styles.container, style]}>
      <View style={styles.line} />
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const themedStyle = StyleService.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'color-strok-gray',
  },
  text: {
    width: 50,
    textAlign: 'center',
    color: 'color-gray',
  },
});
