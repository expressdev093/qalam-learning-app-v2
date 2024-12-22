import React from 'react';
import {IIconProps, Icon} from '../icon';
import {TouchableOpacity} from 'react-native';

type Props = IIconProps & {
  onPress?: () => void;
};

const BackHeaderButton: React.FC<Props> = ({onPress, ...iconProps}) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: 'rgba(219, 219, 219 , .3)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
      }}
      onPress={onPress}>
      <Icon name="arrow-ios-back-outline" color="white" {...iconProps} />
    </TouchableOpacity>
  );
};

export default BackHeaderButton;
