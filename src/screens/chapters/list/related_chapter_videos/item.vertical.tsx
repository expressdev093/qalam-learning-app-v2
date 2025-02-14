import {Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ITopicVideo} from '../../../../interfaces';
import {Icon} from '../../../../components/icon';
import {Colors} from '../../../../constants/colors';
import {Utils} from '../../../../constants/utils';
import {useAppSelector} from '../../../../redux';
import {useFavoriteVideo} from '../../../../hooks/useFavoriteVideo';
import Config from 'react-native-config';

type IProps = {
  topicVideo: ITopicVideo;
};

export const RelatedChapterVideoItemVertical: React.FC<IProps> = ({
  topicVideo,
}) => {
  const {isFavorite, handleAddFavoriteVideo, handleRemoveFavorite, isLoading} =
    useFavoriteVideo();
  const styles = useStyleSheet(themedStyle);

  const isFavorited = isFavorite(topicVideo.id);

  const bookmarkIcon = isFavorited
    ? 'bookmark-minus'
    : 'bookmark-minus-outline';
  return (
    <View style={styles.conatiner}>
      <ImageBackground
        source={{
          uri:
            Config.BASE_URL + '/' + topicVideo.topic?.subject?.image ||
            topicVideo.topic?.subject?.placeholderUrl,
        }}
        resizeMode="stretch"
        style={styles.imageBg}>
        <View style={styles.overlay}>
          <Text style={{color: '#FFFFFF'}} category="s1">
            C++
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.labelView}>
            <Text style={styles.label}>{topicVideo.topic?.subject?.name}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              isFavorited
                ? handleRemoveFavorite(topicVideo.id)
                : handleAddFavoriteVideo(topicVideo.id)
            }>
            {isLoading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <Icon
                name={bookmarkIcon}
                size={28}
                pack="material-community"
                color={Colors.primary}
              />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{topicVideo.title}</Text>
        <View style={styles.row}>
          <Text
            style={styles.description}
            category="p1"
            numberOfLines={2}
            ellipsizeMode="tail">
            {Utils.removeHtmlTags(topicVideo.description)}
          </Text>
          <View style={styles.clockView}>
            <Icon
              name="clock-outline"
              size={18}
              color={Colors.grayIcon}
              pack="material-community"
            />
            <Text style={styles.time} category="c1">
              05:30pm
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const themedStyle = StyleSheet.create({
  conatiner: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    flexDirection: 'row',
  },
  imageBg: {
    height: 80,
    width: 80,
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(86,81,249,0.8)', // Replace with your desired color and opacity
    opacity: 0.5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clockView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelView: {
    backgroundColor: 'color-primary-100',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 5,
  },
  label: {
    color: 'color-primary-700',
    fontSize: 14,
  },
  title: {
    marginTop: -2,
    fontWeight: '700',
    fontSize: 15,
    color: '#00000090',
  },
  description: {
    fontSize: 11,
    marginTop: -2,
    padding: 0,
    flex: 1,
    color: 'color-gray-icon',
  },
  time: {
    marginLeft: 2,
    marginTop: 2,
    color: 'color-gray-icon',
  },
});
