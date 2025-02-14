/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {IVideo} from '../../interfaces';
import {useAppSelector} from '../../redux';
import {VideoStateButton} from '../buttons';
import {useTheme} from '@ui-kitten/components';
import {ThemeColorKey} from '../../constants/colors';
import {useFavoriteVideo} from '../../hooks/useFavoriteVideo';
import {useVideoLike} from '../../hooks/useVideoLike';

type IProps = {
  viewCount: number;
  likes: number;
  videoId: number;
};

export const VideoStateComponent: React.FC<IProps> = ({
  viewCount,
  likes,
  videoId,
}) => {
  const {
    likeCount,
    isVideoLiked,
    handleLike,
    handleUnLike,
    isLoading: isVideoLikeLoading,
  } = useVideoLike({
    defaultVideoLikeCount: likes,
    videoId: videoId,
  });
  const theme = useTheme();
  const {handleAddFavoriteVideo, handleRemoveFavorite, isLoading, isFavorite} =
    useFavoriteVideo();
  const {user} = useAppSelector(state => state.auth);

  const isFavorited = isFavorite(videoId);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
        },
      ]}>
      <VideoStateButton
        isActive
        text={viewCount}
        name="remove-red-eye"
        pack="material"
        size={28}
      />
      <VideoStateButton
        isLoading={isVideoLikeLoading}
        text={likeCount}
        name={isVideoLiked ? 'favorite' : 'favorite-outline'}
        pack="material"
        size={28}
        onPress={isVideoLiked ? handleUnLike : handleLike}
      />

      <VideoStateButton
        isLoading={isLoading}
        name={isFavorited ? 'bookmark-minus' : 'bookmark-minus-outline'}
        pack="material-community"
        size={28}
        color={isFavorited ? theme[ThemeColorKey.primary500] : '#000'}
        onPress={() => {
          isFavorited
            ? handleRemoveFavorite(videoId)
            : handleAddFavoriteVideo(videoId);
        }}
      />
    </View>
  );
};
