import {useList} from '@refinedev/core';
import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {IOnlineClass} from '../../interfaces';
import {Colors} from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Classes, emptyImage} from '../../components/svgs';
import {QueryContainer} from '../../components/containers';
import {ClassesTabsNavigation} from './tabbar/top-tabbar';
import {FocusAwareStatusBar} from '../../components/focus-aware-statusbar';

export const ClassesScreen = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyleSheet(themedStyle);
  const onlineClassesState = useList<IOnlineClass>({
    resource: 'online-classes',
    meta: {
      join: [{field: 'chapter'}, {field: 'subject'}],
    },
  });

  const onlineClasses = onlineClassesState.data?.data || [];

  return (
    <Layout style={styles.layout}>
      <LinearGradient
        colors={Colors.grandientColor}
        angle={90}
        useAngle
        style={{height: insets.top}}>
        <FocusAwareStatusBar
          barStyle={'light-content'}
          backgroundColor={styles.layout.backgroundColor}
        />
      </LinearGradient>
      <LinearGradient
        colors={Colors.grandientColor}
        angle={90}
        useAngle
        style={styles.topGradient}>
        <View style={styles.headerView}>
          <View style={{flex: 1}}>
            <Text style={styles.p}>The Best Online</Text>
            <Text style={styles.p} category="h5">
              Academy to
            </Text>
            <Text style={styles.p}>Clear Your Doubts</Text>
          </View>
          <Classes />
        </View>
        <View style={styles.overlapCard}>
          <QueryContainer
            error={onlineClassesState.error}
            isError={onlineClassesState.isError}
            isLoading={onlineClassesState.isLoading}
            isEmpty={onlineClasses.length === 0}
            emptyViewProps={{
              title: 'No online classes added yet',
              imageSource: emptyImage,
            }}>
            <ClassesTabsNavigation onlineClasses={onlineClasses} />
          </QueryContainer>
        </View>
      </LinearGradient>
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: Colors.linearGradientStart,
  },
  topGradient: {
    flex: 300,
  },
  headerView: {
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  overlapCard: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  p: {
    color: 'white',
  },
});
