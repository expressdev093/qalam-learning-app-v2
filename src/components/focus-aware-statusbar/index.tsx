import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StatusBarProps} from 'react-native';

export const FocusAwareStatusBar: React.FC<StatusBarProps> = props => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};
