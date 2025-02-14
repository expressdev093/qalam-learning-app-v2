import {
  Input,
  InputProps,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const InputText: React.FC<InputProps & {}> = props => {
  const {status, label, ...restProps} = props;
  const styles = useStyleSheet(themedStyle);

  return (
    <View style={[styles.container, (styles as any)[status ?? 'basic']]}>
      <Input
        {...restProps}
        label={props => (
          <Text style={[props?.style, styles.label]}>{label as string}</Text>
        )}
        textStyle={styles.textStyle}
        style={[styles.input, restProps.style]}
        status={status}
        size="small"
      />
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    paddingRight: 5,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
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
    marginLeft: -5,
    color: '#000',
  },
  label: {
    color: '#000',
  },
});
