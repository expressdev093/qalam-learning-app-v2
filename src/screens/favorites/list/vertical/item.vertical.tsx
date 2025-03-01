import {Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {IFavoriteVideo} from '../../../../interfaces';
import {useAppDispatch} from '../../../../redux';
import {FavoriteActions} from '../../../../redux/reducers/favorite.reducer';
import {Icon} from '../../../../components/icon';
import {Colors} from '../../../../constants/colors';
import {Utils} from '../../../../constants/utils';
import Config from 'react-native-config';

type IProps = {
  favoriteVideo: IFavoriteVideo;
  onHandleRemoveFavoriteVideo?: (favoriteVideo: IFavoriteVideo) => void;
};

export const FavoriteItemVertical: React.FC<IProps> = ({
  favoriteVideo,
  onHandleRemoveFavoriteVideo,
}) => {
  const styles = useStyleSheet(themedStyle);
  const {topicVideo} = favoriteVideo;

  return (
    <View style={styles.conatiner}>
      <ImageBackground
        source={{
          uri:
            Config.BASE_URL + '/' + topicVideo?.topic?.subject?.image ||
            topicVideo?.topic?.subject?.placeholderUrl,
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
            <Text style={styles.label}>{topicVideo?.topic?.subject?.name}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onHandleRemoveFavoriteVideo?.(favoriteVideo)}>
            <Icon
              name={'bookmark-minus'}
              size={28}
              pack="material-community"
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{topicVideo?.title}</Text>
        <View style={styles.row}>
          <Text
            style={styles.description}
            category="p1"
            numberOfLines={2}
            ellipsizeMode="tail">
            {Utils.removeHtmlTags(topicVideo?.description)}
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
