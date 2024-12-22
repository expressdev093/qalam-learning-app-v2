/* eslint-disable react/self-closing-comp */
import React from 'react';
import {View} from 'react-native';

export const Divider = () => {
  return (
    <View
      style={{
        height: 4,
        width: 100,
        backgroundColor: '#B1B1B1',
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 15,
      }}></View>
  );
};
