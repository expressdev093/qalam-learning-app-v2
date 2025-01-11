/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './root/stack';
import {useFavoriteVideo} from '../hooks/useFavoriteVideo';

export const MainNavigation = () => {
  const {} = useFavoriteVideo();

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
