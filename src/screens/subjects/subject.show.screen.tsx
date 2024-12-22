import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import React, {Fragment, useEffect} from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {useList} from '@refinedev/core';
import {IChapter} from '../../interfaces';
import LinearGradient from 'react-native-linear-gradient';
import {Microscope} from '../../components/svgs';
import {ChaptersListVertical} from '../chapters/list/vertical/list.vertical';
import {Icon} from '../../components/icon';
import {FavoriteHeaderButton} from '../../components/buttons';
import BackHeaderButton from '../../components/buttons/back-header.button';
import {QueryContainer} from '../../components/containers';

export const SubjectShowScreen: React.FC<
  RootStackScreenProps<RouteNames.subjectShow>
> = ({navigation, route}) => {
  const styles = useStyleSheet(themedStyle);
  const {subjectId, name} = route.params;
  const chapterState = useList<IChapter>({
    resource: 'chapters',
    filters: [
      {
        field: 'subjectId',
        operator: 'eq',
        value: subjectId,
      },
      {
        field: 'isActive',
        operator: 'eq',
        value: true,
      },
    ],
  });
  const chapters = chapterState.data?.data || [];

  const onChapterItemClick = (chapter: IChapter) => {
    navigation.navigate(RouteNames.chapterShow, {
      chapterId: chapter.id,
      name: chapter.name,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerShown: true,
      headerRight: props => (
        <Fragment>
          <TouchableOpacity>
            <Icon name="search-outline" color="white" size={28} />
          </TouchableOpacity>
          <View style={{width: 20}} />
          <FavoriteHeaderButton
            color="white"
            onPress={() => navigation.navigate(RouteNames.rootfavorites)}
          />
        </Fragment>
      ),
      title: name,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },

      headerBackground: () => (
        <LinearGradient
          colors={['#D4604C', '#FF8570']}
          useAngle
          angle={90}
          style={{height: 110, marginTop: 0}}
        />
      ),
      headerLeft: props => (
        <BackHeaderButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation, name]);

  return (
    <Layout style={styles.container}>
      <StatusBar backgroundColor={'#D4604C'} barStyle={'light-content'} />
      <LinearGradient
        colors={['#D4604C', '#FF8570']}
        useAngle
        angle={90}
        style={styles.header}>
        <View style={styles.headerTitleView}>
          <Text style={styles.heading} category="h5">
            Chapters
          </Text>
          <Text style={styles.heading} category="s1">
            1/{chapters.length}
          </Text>
        </View>
        <View style={[styles.box]}>
          <Microscope width={40} height={40} />
        </View>
      </LinearGradient>
      <View style={styles.content}>
        <Text category="h6">Choice your Chapter</Text>
        <QueryContainer
          isLoading={chapterState.isLoading}
          isError={chapterState.isError}
          error={chapterState.error}
          isEmpty={chapters.length === 0}>
          <ChaptersListVertical
            onChapterItemClick={onChapterItemClick}
            subjectName={name}
            chapters={chapters}
          />
        </QueryContainer>
      </View>
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 130,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  headerTitleView: {
    flex: 1,
  },
  heading: {
    color: 'white',
  },
  box: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});
