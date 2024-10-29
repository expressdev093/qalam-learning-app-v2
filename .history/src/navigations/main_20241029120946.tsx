import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './root/stack';

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
