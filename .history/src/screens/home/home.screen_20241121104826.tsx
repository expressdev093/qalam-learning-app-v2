import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {Colors, ThemeColorKey} from '../../constants/colors';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export const HomeScreen = () => {
  const styles = useStyleSheet(themedStyle);
  const theme = useTheme();

  useEffect(() => {
    changeNavigationBarColor('#ffffff', false, true);
  }, []);
  return (
    <Layout style={styles.layout}>
      <StatusBar
        backgroundColor={theme[ThemeColorKey.backgroundBasicColor1]}
        barStyle="dark-content"
      />
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
