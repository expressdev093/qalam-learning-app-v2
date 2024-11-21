import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React, {Fragment, useEffect} from 'react';
import {FlatList, StatusBar, Text, View} from 'react-native';
import {Colors, ThemeColorKey} from '../../constants/colors';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {Search} from './components/search';
import {useOne} from '@refinedev/core';
import {IOnlineClass} from '../../interfaces';
import {TopCard} from './components/top-card';

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
      <Search />
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        data={null}
        renderItem={({item}) => null}
        ListHeaderComponent={
          <Fragment>
            <TopCard />
          </Fragment>
        }
      />
    </Layout>
  );
};

const themedStyle = StyleService.create({
  layout: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    flexDirection: 'column',
  },
});
