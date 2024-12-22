import {useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RelatedChapterVideoItemVertical} from './item.vertical';
import {useNavigation} from '@react-navigation/native';
import {useList} from '@refinedev/core';
import {ITopic, ITopicVideosView, IVideo} from '../../../../interfaces';
import {Utils} from '../../../../constants/utils';
import {QueryContainer} from '../../../../components/containers';
import {emptyImage} from '../../../../components/svgs';
import {RouteNames} from '../../../../navigations/constants/route.name';
import {RootStackNavigationProp} from '../../../../navigations/root/types';

type IProps = {
  chapterId?: number;
};

export const RelatedChapterVideoVerticalList: React.FC<IProps> = ({
  chapterId,
}) => {
  const navigation = useNavigation<RootStackNavigationProp<any>>();
  const topicState = useList<ITopic>({
    resource: 'topics',
    queryOptions: {
      enabled: !!chapterId,
    },
    filters: [
      {
        field: 'chapterId',
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
        {field: 'videos'},
        {field: 'chapter', select: ['id', 'name']},
        {field: 'subject', select: ['id', 'name', 'image']},
      ],
    },
  });

  const topics = topicState.data?.data || [];
  const topicVideos = Utils.mapTopicVideos(topics);
  const styles = useStyleSheet(themedStyle);

  const onItemClick = (topicVideoView: ITopicVideosView) => {
    navigation.navigate(RouteNames.video, {
      video: {
        entityName: 'topic-videos',
        entityId: topicVideoView.id,
        // url: BASE_URL + '/' + appCorner.video,
        // thumbnailUrl: BASE_URL + '/' + appCorner.videoThumbnail,
        // title: appCorner.title,
        // description: appCorner.description,
      } as IVideo,
    });
  };

  return (
    <QueryContainer
      error={topicState.error}
      isError={topicState.isError}
      isLoading={topicState.isLoading}
      isEmpty={topicVideos.length === 0}
      emptyViewProps={{
        title: 'No related video found',
        imageSource: emptyImage,
      }}>
      <FlatList
        style={styles.conatiner}
        data={topicVideos}
        keyExtractor={item => `${item.id}-${item.videoId}`}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onItemClick(item)}>
            <RelatedChapterVideoItemVertical
              key={index}
              topicVideoView={item}
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        showsVerticalScrollIndicator={false}
      />
    </QueryContainer>
  );
};

const themedStyle = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  itemSeparator: {
    height: 10,
  },
});
