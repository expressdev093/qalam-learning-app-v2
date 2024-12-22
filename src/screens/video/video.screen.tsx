/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Divider,
  Layout,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
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
import {FlatList, Platform, StatusBar, StyleSheet, View} from 'react-native';
import {CustomVideoPlayer} from '../../components/video-player';
import {OnProgressData} from 'react-native-video';
import {BASE_URL} from '@env';
import {VideoStateComponent} from './components/video-states.component';
import CollapsibleHtmlView from '../../components/htmlview/collapsible-html.view';
import {Icon} from '../../components/icon';
import {QuizIcon} from '../../components/svgs';
import {RelatedChapterVideoVerticalList} from '../chapters/list/related_chapter_videos';

export const VideoScreen: React.FC<RootStackScreenProps<RouteNames.video>> = ({
  route,
  navigation,
}) => {
  const styles = useStyleSheet(themedStyle);
  const {video} = route.params;
  const [viewCount, setViewCount] = useState<number>(0);
  const [topicVideo, setTopicVideo] = useState<ITopicVideo>();
  const [videoData, setVideoData] = useState<IVideoData>();
  const topicVideoState = useOne<ITopicVideo>({
    resource: 'topic-videos',
    id: video.entityId,
    queryOptions: {
      enabled: false,
    },
    meta: {
      join: [{field: 'topic'}, {field: 'topic.chapter'}],
    },
  });

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

  useEffect(() => {
    loadVideoData();
  }, [video]);

  const loadVideoData = async () => {
    if (video.entityName === 'topic-videos') {
      const {data} = await topicVideoState.refetch();
      if (data?.data) {
        setTopicVideo(data.data);
        setVideoData({
          title: data.data.title,
          description: data.data.description,
          url: data.data.url,
          thumbnailUrl: data.data.thumbnail,
          videoQualities: data.data.videoQualities || [],
        });
      }
    }
  };
  const onHandleProgress = (progress: OnProgressData) => {
    const videoDuration = progress.seekableDuration;
    const currentTime = progress.currentTime;
    const watchedPercentage = currentTime / videoDuration;

    // Check if the watched percentage exceeds the threshold
    // if (watchedPercentage >= viewCountThreshold) {
    //   // Increment view count when the threshold is reached
    //   if (!isVideoViewCounted) {
    //     setVideoViewCounted(true);
    //     updateVideoView();
    //     //setViewCount(prevCount => prevCount + 1);
    //   }
    // }
  };

  const onStartVideo = useCallback(async () => {
    if (video.entityName === 'topic-videos') {
      // const notExist =
      //   topicVideos.find(v => v.id === video.entityId) === undefined;
      // if (notExist) {
      //   try {
      //     const result = await fetchTopicVideo();
      //     dispatch(addInContinueStudy(result));
      //   } catch (err) {
      //   }
      // }
    }
  }, []);

  const onEndVideo = useCallback(() => {
    try {
      if (video.entityName === 'topic-videos') {
        // addRecentlyLearnVideo({
        //   userId: user?.id,
        //   topicVideoId: video.entityId,
        // });
        // dispatch(removeContinueStudy(video.entityId));
      }
    } catch (err) {}
  }, []);

  const renderDivider = <Divider style={styles.divider} />;

  const renderExerciseButton = (
    <Button
      size="tiny"
      style={{borderRadius: 15}}
      accessoryLeft={props => (
        <Icon {...props} name="document-text-outline" pack="ion" />
      )}
      onPress={() => {
        // navigation.navigate(RouteNames.videoStackShowExercise, {
        //   chapterId: topicVideo?.topic?.chapterId,
        // })
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
        // navigation.navigate(RouteNames.quizStack, {
        //   quiz: chapterQuizze,
        // })
      }}
      style={{borderRadius: 15, backgroundColor: '#E2E4E1'}}
      accessoryLeft={props => <QuizIcon {...props} fill={'#000'} />}>
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
      <CustomVideoPlayer
        videoQualities={[]}
        onHandleProgress={onHandleProgress}
        video={videoData}
        source={{uri: BASE_URL + '/' + videoData?.url}}
        poster={BASE_URL + '/' + videoData?.thumbnailUrl}
        onStartVideo={onStartVideo}
        onEndVideo={onEndVideo}
        style={{
          ...Platform.select({
            ios: {
              height: 300,
            },
            android: {
              height: 250,
            },
          }),
        }}
      />
      <View style={{flex: 1, padding: 20}}>
        <Text category="h6">{videoData?.title}</Text>
        <VideoStateComponent viewCount={viewCount} video={video} />
        <FlatList
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          data={null}
          renderItem={({item}) => null}
          ListHeaderComponent={
            <Fragment>
              <CollapsibleHtmlView html={videoData?.description} />
              {renderDivider}
              <View style={styles.row}>
                <View style={{flex: 1}}>
                  <Text category="p2">Document File</Text>
                  <Text category="h6" style={styles.primaryText}>
                    {topicVideo?.topic?.chapter?.subject?.name}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text category="s1">Chapter : </Text>
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
});
