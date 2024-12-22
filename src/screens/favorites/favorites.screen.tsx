import {Layout, Text, useTheme} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {FavoriteVerticalList} from './list/vertical';
import {FocusAwareStatusBar} from '../../components/focus-aware-statusbar';
import {ThemeColorKey} from '../../constants/colors';

export const FavoriteScreen = () => {
  const theme = useTheme();
  return (
    <Layout style={styles.conatiner}>
      <FocusAwareStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <FavoriteVerticalList />
    </Layout>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    padding: 20,
  },
});
