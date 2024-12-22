import React, {Fragment, PropsWithChildren} from 'react';
import {Circle, Svg, SvgProps} from 'react-native-svg';
import {Colors} from '../../constants/colors';
import {View} from 'react-native';

type Props = PropsWithChildren & SvgProps;

export const CircleSvg: React.FC<Props> = ({children, ...svgProps}) => {
  const {height, width} = svgProps;
  const cx = height ? (height as any) / 2 : 50;
  const cy = width ? (width as any) / 2 : 50;
  const r = height ? (height as any) / 2 : 50;

  return (
    <View style={{width, height, alignSelf: 'center'} as any}>
      <Svg {...svgProps}>
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={Colors.primary}
          strokeWidth="4"
          strokeDasharray={'20,10'}
          fill="none"
        />
      </Svg>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}>
        {children}
      </View>
    </View>
  );
};
