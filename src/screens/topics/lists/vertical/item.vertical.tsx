import {Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {personImage} from '../../../../components/svgs';
import {Utils} from '../../../../constants/utils';
import {ITopicVideosView, ITopicVideo, ITopic} from '../../../../interfaces';
import {Colors} from '../../../../constants/colors';
import {Icon} from '../../../../components/icon';

type IProps = {
  topicVideoView: ITopicVideosView;
  onPlayVideoClick?: (topicVideo: ITopicVideo) => void;
  onTopicItemClick?: (topic: ITopic) => void;
};

export const TopicItemVertical: React.FC<IProps> = ({
  topicVideoView,
  onTopicItemClick,
  onPlayVideoClick,
}) => {
  const {
    id,
    name,
    description,
    chapterId,
    subjectId,
    isActive,
    videoId,
    videoTitle,
    videoDescription,
    videoUrl,
    videoThumbnail,
    videoViews,
  } = topicVideoView;

  const topic: ITopic = {
    id: id,
    name: name,
    description: description,
    chapterId: chapterId,
    subjectId: subjectId,
    videos: [],
    isActive: isActive,
  };

  const topicVideo: ITopicVideo = {
    id: videoId,
    title: videoTitle,
    description: videoDescription,
    url: videoUrl,
    thumbnail: videoThumbnail,
    isActive: true,
    topicId: id,
    views: videoViews,
  };

  const styles = useStyleSheet(themedStyle);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onTopicItemClick?.(topic)}>
        <LinearGradient
          colors={Colors.gradientSecondaryColors}
          useAngle
          angle={90}
          style={styles.gradientView}>
          <Image source={personImage} style={{alignSelf: 'flex-end'}} />
          <View style={{flex: 1}}>
            <Text category="h5" style={styles.colorWhite}>
              {name}
            </Text>
            <Text
              style={[styles.colorWhite, styles.topicDescription]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {Utils.removeHtmlTags(description)}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.content}
        onPress={() => onPlayVideoClick?.(topicVideo)}>
        <View style={styles.videoIcon}>
          <Icon
            size={24}
            name="play-arrow"
            pack="material"
            style={styles.icon}
          />
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.title}>{videoTitle}</Text>
          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail">
            {videoDescription}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 5,
  },
  gradientView: {
    height: 95,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  colorWhite: {
    color: 'white',
  },
  videoIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'color-secondary',
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  description: {
    marginTop: 0,
    fontSize: 12,
  },
  icon: {
    color: 'color-secondary',
  },
  content: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 5,
  },
  topicDescription: {
    marginRight: 10,
  },
});
