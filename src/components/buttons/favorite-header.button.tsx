import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IIconProps, Icon} from '../icon';

export const FavoriteHeaderButton: React.FC<
  IIconProps & {
    onPress?: () => void;
  }
> = ({onPress, ...iconProps}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon
        name="bookmark-minus-outline"
        size={28}
        pack="material-community"
        {...iconProps}
      />
    </TouchableOpacity>
  );
};
