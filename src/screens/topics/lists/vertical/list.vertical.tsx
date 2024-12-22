import {Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import {TopicItemVertical} from './item.vertical';
import {ITopic, ITopicVideo, ITopicVideosView} from '../../../../interfaces';

type Props = {
  onTopicItemClick?: (topic: ITopic) => void;
  onPlayVideoClick?: (topicVideo: ITopicVideo) => void;
  topicVideos: ITopicVideosView[];
};

export const TopicsVerticalList: React.FC<Props> = ({
  onTopicItemClick,
  topicVideos,
  onPlayVideoClick,
}) => {
  const styles = useStyleSheet(themedStyle);

  return (
    <FlatList
      style={styles.flatList}
      data={topicVideos}
      keyExtractor={item => `${item.id}-${item.videoId}`}
      renderItem={({item, index}) => (
        <TopicItemVertical
          key={`${item.id}-${item.videoId}`}
          topicVideoView={item}
          onTopicItemClick={onTopicItemClick}
          onPlayVideoClick={onPlayVideoClick}
        />
      )}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
    />
  );
};

const themedStyle = StyleSheet.create({
  itemSeparator: {
    height: 10,
  },
  flatList: {
    marginTop: 10,
  },
});
