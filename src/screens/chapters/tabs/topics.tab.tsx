import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ChapterTabScreenProps} from '../tabbar/types';
import {RouteNames} from '../../../navigations/constants/route.name';
import {useList} from '@refinedev/core';
import {ITopic, ITopicVideo, ITopicVideosView} from '../../../interfaces';
import {TopicsVerticalList} from '../../topics/lists/vertical/list.vertical';
import {QueryContainer} from '../../../components/containers';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../../navigations/root/types';
import {Utils} from '../../../constants/utils';

export const ChapterTopicTab: React.FC<
  ChapterTabScreenProps<RouteNames.chapterTopicsTab>
> = ({navigation, route}) => {
  const rootNavigation = useNavigation<RootStackNavigationProp<any>>();
  const {chapterId} = route.params;
  const topicState = useList<ITopic>({
    resource: 'topics',
    filters: [
      {
        field: 'chapterId',
        operator: 'eq',
        value: chapterId,
      },
    ],
    meta: {
      join: [
        {field: 'videos'},
        {field: 'chapter', select: ['id', 'name']},
        {field: 'subject', select: ['id', 'name', 'image']},
      ],
    },
  });

  const topics = topicState.data?.data || [];
  const topicVideos = Utils.mapTopicVideos(topics);

  const onTopicItemClick = (topic: ITopic) => {
    rootNavigation.navigate(RouteNames.topicShow, {
      topic,
    });
  };

  const onPlayVideoClick = (topicVideo: ITopicVideo) => {
    rootNavigation.navigate(RouteNames.video, {
      video: {
        entityName: 'topic-videos',
        entityId: topicVideo.id,
        // url: BASE_URL + '/' + topicVideo.url,
        // thumbnailUrl: BASE_URL + '/' + topicVideo.thumbnail,
        // title: topicVideo.title,
        // description: topicVideo.description,
      },
    });
  };

  return (
    <Layout style={styles.container}>
      <QueryContainer
        isError={topicState.isError}
        isLoading={topicState.isLoading}
        error={topicState.error}
        isEmpty={topicVideos.length === 0}>
        <TopicsVerticalList
          onTopicItemClick={onTopicItemClick}
          onPlayVideoClick={onPlayVideoClick}
          topicVideos={topicVideos}
        />
      </QueryContainer>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
