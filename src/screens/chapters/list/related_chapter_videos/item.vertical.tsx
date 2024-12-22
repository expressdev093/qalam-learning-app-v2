import {Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {BASE_URL} from '@env';
import {ITopicVideosView} from '../../../../interfaces';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../../redux';
import {Icon} from '../../../../components/icon';
import {Colors} from '../../../../constants/colors';
import {Utils} from '../../../../constants/utils';

type IProps = {
  topicVideoView: ITopicVideosView;
};

export const RelatedChapterVideoItemVertical: React.FC<IProps> = ({
  topicVideoView,
}) => {
  const dispatch = useDispatch();
  // const {topicVideoViews: favoriteTopicVideos, isFavoriteLoaded} =
  //   useAppSelector(state => state.favorites);
  const styles = useStyleSheet(themedStyle);

  const isFavorite = false; // favoriteTopicVideos.find(f => f.id === topicVideoView.id) !== undefined;
  const bookmarkIcon = isFavorite ? 'bookmark-minus' : 'bookmark-minus-outline';
  return (
    <View style={styles.conatiner}>
      <ImageBackground
        source={{uri: BASE_URL + '/' + topicVideoView.subjectImage}}
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
            <Text style={styles.label}>{topicVideoView.subjectName}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            // onPress={() =>
            //   isFavorite
            //     ? dispatch(removeFavorites(topicVideoView.id))
            //     : dispatch(addFavroites(topicVideoView))
            // }
          >
            <Icon
              name={bookmarkIcon}
              size={28}
              pack="material-community"
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{topicVideoView.videoTitle}</Text>
        <View style={styles.row}>
          <Text
            style={styles.description}
            category="p1"
            numberOfLines={2}
            ellipsizeMode="tail">
            {Utils.removeHtmlTags(topicVideoView.videoDescription)}
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
    backgroundColor: 'color-primary-300',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 5,
  },
  label: {
    color: '#fff',
    fontSize: 14,
  },
  title: {
    marginTop: -2,
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
