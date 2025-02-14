/* eslint-disable react/self-closing-comp */
import React from 'react';
import {View} from 'react-native';

export const Divider = () => {
  return (
    <View
      style={{
        position: 'relative',
        height: 4,
        width: 104,
        backgroundColor: '#d9d9d9',
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 15,
      }}>
      <View
        style={{
          position: 'absolute',
          height: 4,
          width: 52,
          backgroundColor: '#B1B1B1',
          alignSelf: 'center',
          borderRadius: 5,
          left: 0,
        }}
      />
    </View>
  );
};
