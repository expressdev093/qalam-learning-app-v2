import React from 'react';
import {Icon as EvaIcon, IconProps} from '@ui-kitten/components';

export interface IIconProps extends IconProps {
  pack?:
    | 'antdesign'
    | 'entypo'
    | 'evil'
    | 'feather'
    | 'fontawesome'
    | 'fontawesome5'
    | 'fontisto'
    | 'foundation'
    | 'ion'
    | 'material-community'
    | 'material'
    | 'octi'
    | 'simple-line'
    | 'zocial'
    | 'assets'
    | undefined;
  color?: string;
  size?: number;
}

export const Icon: React.FC<IIconProps> = ({
  color,
  size = 24,
  style,
  ...props
}) => {
  return (
    <EvaIcon
      {...props}
      style={{
        ...style,
        tintColor: color ?? style?.tintColor,
        height: size ?? style?.height,
        width: size ?? style?.height,
      }}
    />
  );
};
