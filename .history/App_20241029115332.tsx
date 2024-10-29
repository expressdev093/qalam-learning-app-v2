import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const App = () => {
  return (
    <SafeAreaView>
      <Text>App</Text>
      <MaterialIcons name="home" size={28} />
    </SafeAreaView>
  );
};
