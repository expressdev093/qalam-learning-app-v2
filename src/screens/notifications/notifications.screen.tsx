import {Layout, Text, useTheme} from '@ui-kitten/components';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {NotificationVerticalList} from './list/vertical';
import {FocusAwareStatusBar} from '../../components/focus-aware-statusbar';
import {ThemeColorKey} from '../../constants/colors';

export const NotificationScreen = () => {
  const theme = useTheme();
  return (
    <Layout style={styles.conatiner}>
      <FocusAwareStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        data={null}
        renderItem={({item}) => null}
        ListHeaderComponent={
          <React.Fragment>
            <Text style={styles.label}>Today</Text>
            <NotificationVerticalList />

            <Text style={[styles.label, {marginTop: 10}]}>Yesterday</Text>
            <NotificationVerticalList />
          </React.Fragment>
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    padding: 20,
  },
  label: {},
});
