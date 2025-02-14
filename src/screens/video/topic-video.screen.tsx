/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Divider, Text, useStyleSheet} from '@ui-kitten/components';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {useList, useOne} from '@refinedev/core';
import {IQuiz, ITopicVideo, IVideoData} from '../../interfaces';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {CustomVideoPlayer} from '../../components/video-player';
import {OnProgressData} from 'react-native-video';
import {VideoStateComponent} from '../../components/video-player/video-states.component';
import CollapsibleHtmlView from '../../components/htmlview/collapsible-html.view';
import {Icon} from '../../components/icon';
import {BrainPrimary, QuizIcon} from '../../components/svgs';
import {RelatedChapterVideoVerticalList} from '../chapters/list/related_chapter_videos';
import {useVideoViewCount} from '../../hooks/useVideoViewCount';
import {useAppDispatch, useAppSelector} from '../../redux';
import {ContineuStudyActions} from '../../redux/reducers/continue-study.reducer';
import {Video} from './components/video';

export const TopicVideoScreen: React.FC<
  RootStackScreenProps<RouteNames.topicVideo>
> = ({route, navigation}) => {
  const styles = useStyleSheet(themedStyle);
  const {videoId} = route.params;

  const topicVideoState = useOne<ITopicVideo>({
    resource: 'topic-videos',
    id: videoId,
    meta: {
      join: [
        {field: 'topic'},
        {field: 'topic.chapter'},
        {field: 'topic.subject'},
      ],
    },
  });

  const topicVideo = topicVideoState.data?.data;

  const quizzesState = useList<IQuiz>({
    resource: 'quizzes',
    queryOptions: {
      enabled: !!topicVideo?.topic,
    },
    pagination: {
      pageSize: 1,
    },
    filters: [
      {
        field: 'entityId',
        operator: 'eq',
        value: topicVideo?.topic?.chapterId,
      },
      {
        field: 'type',
        operator: 'eq',
        value: 'chapters',
      },
      {
        field: 'isActive',
        operator: 'eq',
        value: true,
      },
    ],
    sorters: [
      {
        field: 'createdAt',
        order: 'desc',
      },
    ],
  });

  const renderDivider = <Divider style={styles.divider} />;

  const renderExerciseButton = (
    <Button
      size="tiny"
      style={{borderRadius: 15}}
      accessoryLeft={props => (
        <Icon {...props} name="document-text-outline" pack="ion" />
      )}
      onPress={() => {
        if (topicVideo?.topic?.chapterId!) {
          navigation.navigate(RouteNames.chapterExerciseShow, {
            chapterId: topicVideo?.topic?.chapterId!,
          });
        }
      }}>
      {props => (
        <Text
          {...props}
          style={[props?.style, {fontSize: 16, fontWeight: '600'}]}>
          Exercise
        </Text>
      )}
    </Button>
  );

  const chapterQuizze = useMemo(() => {
    if (quizzesState?.data?.data?.length) {
      return quizzesState?.data?.data[0];
    }
    return undefined;
  }, [quizzesState]);

  const renderPlayQuizButton = chapterQuizze && (
    <Button
      size="tiny"
      appearance="ghost"
      onPress={() => {
        navigation.navigate(RouteNames.quiz, {
          quizId: chapterQuizze.id,
        });
      }}
      style={{borderRadius: 15, backgroundColor: '#E2E4E1'}}
      accessoryLeft={props => <BrainPrimary {...props} fill={'#000'} />}>
      {props => (
        <Text
          {...props}
          style={[props?.style, {fontSize: 16, fontWeight: '600'}]}>
          Play Quiz
        </Text>
      )}
    </Button>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'rgba(0,0,0,1)'} />
      <View style={styles.videoLoader}>
        {topicVideoState.isLoading && !topicVideo ? (
          <ActivityIndicator size="large" />
        ) : topicVideo ? (
          <Video topicVideo={topicVideo} />
        ) : (
          <></>
        )}
      </View>
      <View style={{flex: 1, padding: 20}}>
        <FlatList
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          data={null}
          renderItem={({item}) => null}
          ListHeaderComponent={
            <Fragment>
              <CollapsibleHtmlView html={topicVideo?.description} />
              {renderDivider}
              <View style={styles.row}>
                <View style={{flex: 1}}>
                  <Text
                    category="p2"
                    style={{
                      color: '#00000090',
                      fontSize: 12,
                    }}>
                    Document File
                  </Text>
                  <Text category="h6" style={styles.primaryText}>
                    {topicVideo?.topic?.subject?.name}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      category="s1"
                      style={{fontWeight: 'bold', color: '#00000090'}}>
                      Chapter :{' '}
                    </Text>
                    <Text category="p1">
                      {topicVideo?.topic?.chapter?.name}
                    </Text>
                  </View>
                </View>
                <View>
                  {renderExerciseButton}
                  <View style={{height: 5}} />
                  {renderPlayQuizButton}
                </View>
              </View>
              {renderDivider}
              <RelatedChapterVideoVerticalList
                chapterId={topicVideo?.topic?.chapterId}
              />
            </Fragment>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    height: 2,
    marginVertical: 15,
    backgroundColor: '#00000020',
  },
  primaryText: {
    color: 'color-primary-500',
  },
  videoLoader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
