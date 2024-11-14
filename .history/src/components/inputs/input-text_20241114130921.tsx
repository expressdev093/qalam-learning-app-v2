import {
  Input,
  InputProps,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';

export const InputText: React.FC<InputProps & {}> = props => {
  const {status, ...restProps} = props;
  const styles = useStyleSheet(themedStyle);

  return (
    <View style={[styles.container, (styles as any)[status ?? 'basic']]}>
      <Input
        {...restProps}
        textStyle={styles.textStyle}
        style={[styles.input, restProps.style]}
        status={status}
        size="small"
      />
    </View>
  );
};

const themedStyle = StyleService.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
    width: '100%',
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
  },
});
