import React from 'react';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  name: string | symbol;
  style: StyleProp<any>;
};

export const IonIconsPack = {
  name: 'ion',
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name);
      },
    },
  );
}

const IconProvider = (name: string | symbol) => ({
  toReactElement: (props: Props) => CreateIcon({...props, name}),
});

const CreateIcon = ({name, style}: Props) => {
  const {height, tintColor, ...iconStyle} = StyleSheet.flatten(style);
  return (
    <Icon
      name={name as any}
      size={height as any}
      color={tintColor}
      style={iconStyle}
    />
  );
};
