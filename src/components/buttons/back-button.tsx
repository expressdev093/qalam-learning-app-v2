import React from 'react';
import {Icon} from '../icon';
import {IS_IOS} from '../../constants/platform';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {Colors} from '../../constants/colors';
import {RootStackNavigationProp} from '../../navigations/root/types';

export type Props = {
  navigation: RootStackNavigationProp<any>;
} & TouchableOpacityProps;

export const BackButton: React.FC<Props> = props => {
  const name = IS_IOS ? 'arrow-back-ios' : 'arrow-back';
  const canGoback = props.navigation.canGoBack();

  const onhandlePress = (e: any) => {
    if (props.onPress) {
      props.onPress(e);
    } else {
      props.navigation.goBack();
    }
  };
  return canGoback ? (
    <TouchableOpacity
      {...props}
      style={[
        {paddingHorizontal: 20, backgroundColor: Colors.basicBackgroundColor1},
        props.style,
      ]}
      onPress={onhandlePress}>
      <Icon name={name} pack="material" color="black" />
    </TouchableOpacity>
  ) : (
    <></>
  );
};
