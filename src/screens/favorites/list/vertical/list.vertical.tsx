import {useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FavoriteItemVertical} from './item.vertical';
import {useNavigation} from '@react-navigation/native';
import {MessageView} from '../../../../components/empty';
import {emptyImage} from '../../../../components/svgs';
import {useAppSelector} from '../../../../redux';
import {ITopicVideosView} from '../../../../interfaces';
import {RouteNames} from '../../../../navigations/constants/route.name';
import {RootStackNavigationProp} from '../../../../navigations/root/types';

export const FavoriteVerticalList = () => {
  const navigation = useNavigation<RootStackNavigationProp<any>>();
  const {topicVideoViews} = useAppSelector(state => state.favorite);
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
      },
    });
  };

  return topicVideoViews.length > 0 ? (
    <FlatList
      style={styles.conatiner}
      data={topicVideoViews}
      keyExtractor={item => `${item.id}-${item.videoId}`}
      renderItem={({item, index}) => (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onItemClick(item)}>
          <FavoriteItemVertical key={index} topicVideoView={item} />
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      showsVerticalScrollIndicator={false}
    />
  ) : (
    <MessageView
      title="Favroites"
      description="No favorites added yet."
      imageSource={emptyImage}
    />
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
