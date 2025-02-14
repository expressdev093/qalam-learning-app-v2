/* eslint-disable react-hooks/exhaustive-deps */
import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {useOne} from '@refinedev/core';
import {IChapter} from '../../interfaces';
import {ChapterTabsNavigation} from './tabbar/top-tabbar';
import {Colors} from '../../constants/colors';

export const ChapterShowScreen: React.FC<
  RootStackScreenProps<RouteNames.chapterShow>
> = ({navigation, route}) => {
  const styles = useStyleSheet(themedStyle);
  const {chapterId} = route.params;

  const chapterState = useOne<IChapter>({
    resource: 'chapters',
    id: chapterId,
  });
  const chapter = chapterState.data?.data;

  useEffect(() => {
    if (chapter) {
      navigation.setOptions({
        title: chapter.name,
      });
    }
  }, [chapter]);
  return (
    <Layout style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.basicBackgroundColor1}
      />
      {chapter && <ChapterTabsNavigation chapter={chapter} />}
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
