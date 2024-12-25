import React, {useRef, useEffect} from 'react';
import {View, Animated} from 'react-native';

interface CustomProgressBarProps {
  progress: number;
  width: number;
  height: number;
  color: string;
}

export const CustomProgressBar: React.FC<CustomProgressBarProps> = ({
  progress,
  width,
  height,
  color,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, progress]);

  const widthInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={{
        width,
        height,
        backgroundColor: '#d0d0d0',
        borderRadius: 20,
        overflow: 'hidden',
      }}>
      <Animated.View
        style={{
          height: '100%',
          backgroundColor: color,
          width: widthInterpolate,
        }}
      />
    </View>
  );
};
