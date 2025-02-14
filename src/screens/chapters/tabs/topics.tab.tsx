import {Layout} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ChapterTabScreenProps} from '../tabbar/types';
import {RouteNames} from '../../../navigations/constants/route.name';
import {useList} from '@refinedev/core';
import {ITopic, ITopicVideo} from '../../../interfaces';
import {TopicsVerticalList} from '../../topics/lists/vertical/list.vertical';
import {QueryContainer} from '../../../components/containers';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../../navigations/root/types';
import {View} from 'react-native';
import {Text} from 'react-native';

export const ChapterTopicTab: React.FC<
  ChapterTabScreenProps<RouteNames.chapterTopicsTab>
> = ({route}) => {
  const rootNavigation = useNavigation<RootStackNavigationProp<any>>();
  const {chapterId} = route.params;

  const topicVideoState = useList<ITopicVideo>({
    resource: 'topic-videos',
    filters: [
      {
        field: 'topic.chapterId',
        operator: 'eq',
        value: chapterId,
      },
      {
        field: 'isActive',
        operator: 'eq',
        value: true,
      },
    ],
    meta: {
      join: [
        {field: 'topic'},
        {field: 'topic.chapter', select: ['id', 'name']},
        {field: 'topic.subject', select: ['id', 'name', 'image']},
      ],
    },
  });

  const topicVideos = topicVideoState.data?.data || [];

  const onTopicItemClick = (topic: ITopic) => {
    rootNavigation.navigate(RouteNames.topicShow, {
      topic,
    });
  };

  const onPlayVideoClick = (topicVideo: ITopicVideo) => {
    rootNavigation.navigate(RouteNames.topicVideo, {
      videoId: topicVideo.id,
      // video: {
      //   entityName: 'topic-videos',
      //   entityId: topicVideo.id,
      //   // url: BASE_URL + '/' + topicVideo.url,
      //   // thumbnailUrl: BASE_URL + '/' + topicVideo.thumbnail,
      //   // title: topicVideo.title,
      //   // description: topicVideo.description,
      // },
    });
  };

  return (
    <Layout style={styles.container}>
      <QueryContainer
        isError={topicVideoState.isError}
        isLoading={topicVideoState.isLoading}
        error={topicVideoState.error}
        isEmpty={topicVideos.length === 0}>
        <View>
          <Text
            style={{
              color: '#000',
              fontSize: 16,
              fontWeight: '600',
              marginVertical: 5,
            }}>
            Choice your course
          </Text>
          <TopicsVerticalList
            onTopicItemClick={onTopicItemClick}
            onPlayVideoClick={onPlayVideoClick}
            topicVideos={topicVideos}
          />
        </View>
      </QueryContainer>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
