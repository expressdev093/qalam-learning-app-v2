import React from 'react';
import {Icon} from '../icon';
import {IS_IOS} from '../../constants/platform';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

export const BackButton: React.FC<TouchableOpacityProps> = props => {
  const name = IS_IOS ? 'arrow-back-ios' : 'arrow-back';
  return (
    <TouchableOpacity {...props}>
      <Icon name={name} pack="material" color="black" />
    </TouchableOpacity>
  );
};
