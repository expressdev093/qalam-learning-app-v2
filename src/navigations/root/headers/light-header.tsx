import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import BackHeaderButton from '../../../components/buttons/back-header.button';
import {Colors} from '../../../constants/colors';

export const LightHeader: React.FC<NativeStackHeaderProps> = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.basicBackgroundColor1,
        paddingHorizontal: 15,
      }}>
      <BackHeaderButton
        onPress={() => props.navigation.goBack()}
        color="#000"
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: '#000',
          marginLeft: -40,
        }}>
        {props.options.title}
      </Text>
      <View />
    </View>
  );
};
