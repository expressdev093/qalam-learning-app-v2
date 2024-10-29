import {
  Input,
  InputProps,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {View, StyleSheet} from 'react-native';

export const InputText: React.FC<InputProps & {}> = props => {
  const {status, ...restProps} = props;
  const styles = useStyleSheet(themedStyle);

  return (
    <View style={[styles.container, (styles as any)[status ?? 'basic']]}>
      <Input
        {...restProps}
        textStyle={styles.textStyle}
        style={styles.input}
        status={status}
        size="small"
      />
    </View>
  );
};

const themedStyle = StyleService.create({
  container: {
    backgroundColor: 'yellow',
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  input: {
    backgroundColor: 'red',
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
    margin: 0,
  },
  danger: {
    borderWidth: 1,
    borderColor: 'color-danger-500',
  },
  basic: {
    borderWidth: 0,
  },
  textStyle: {
    paddingHorizontal: 0,
    padding: 0,
    margin: 0,
  },
});
