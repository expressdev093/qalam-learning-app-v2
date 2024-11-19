import {Layout, StyleService, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {Colors} from '../../constants/colors';

export const HomeScreen = () => {
  const styles = useStyleSheet(themedStyle);
  return (
    <Layout style={styles.layout}>
      <StatusBar backgroundColor={Colors.white} />
      <Text>HomeScreen</Text>
    </Layout>
  );
};

const themedStyle = StyleService.create({
  layout: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
  },
});
