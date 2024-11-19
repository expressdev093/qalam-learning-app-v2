import {Layout, StyleService, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {Text, View} from 'react-native';

export const HomeScreen = () => {
  const styles = useStyleSheet(themedStyle);
  return (
    <Layout style={styles.layout}>
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
