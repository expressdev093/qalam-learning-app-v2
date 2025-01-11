/* eslint-disable react-hooks/exhaustive-deps */
import {useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FavoriteItemVertical} from './item.vertical';
import {useNavigation} from '@react-navigation/native';
import {IFavoriteVideo} from '../../../../interfaces';
import {RouteNames} from '../../../../navigations/constants/route.name';
import {RootStackNavigationProp} from '../../../../navigations/root/types';
import {QueryContainer} from '../../../../components/containers';
import {useFavoriteVideo} from '../../../../hooks/useFavoriteVideo';

export const FavoriteVerticalList = () => {
  const navigation = useNavigation<RootStackNavigationProp<any>>();
  const {handleRemoveFavorite, favoriteVideoState, favoriteVideos} =
    useFavoriteVideo();

  const styles = useStyleSheet(themedStyle);

  const onItemClick = (favoriteVideo: IFavoriteVideo) => {
    navigation.navigate(RouteNames.video, {
      video: {
        entityName: 'topic-videos',
        entityId: favoriteVideo.topicVideoId,
        // url: BASE_URL + '/' + appCorner.video,
        // thumbnailUrl: BASE_URL + '/' + appCorner.videoThumbnail,
        // title: appCorner.title,
        // description: appCorner.description,
      },
    });
  };

  return (
    <QueryContainer
      isLoading={favoriteVideoState.isLoading}
      isError={favoriteVideoState.isError}
      error={favoriteVideoState.error}
      isEmpty={favoriteVideos.length === 0}>
      <FlatList
        style={styles.conatiner}
        data={favoriteVideos}
        keyExtractor={item => `${item.id}`}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onItemClick(item)}>
            <FavoriteItemVertical
              key={index}
              favoriteVideo={item}
              onHandleRemoveFavoriteVideo={favoritevideo =>
                handleRemoveFavorite(favoritevideo.id)
              }
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        showsVerticalScrollIndicator={false}
      />
    </QueryContainer>
  );

  //   return topicVideoViews.length > 0 ? (

  //   ) : (
  //     <MessageView
  //       title="Favroites"
  //       description="No favorites added yet."
  //       imageSource={emptyImage}
  //     />
  //   );
  // };
};

const themedStyle = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  itemSeparator: {
    height: 10,
  },
});
