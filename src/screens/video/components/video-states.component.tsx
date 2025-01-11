/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {IVideo} from '../../../interfaces';
import {useAppSelector} from '../../../redux';
import {VideoStateButton} from '../../../components/buttons';
import {useTheme} from '@ui-kitten/components';
import {ThemeColorKey} from '../../../constants/colors';
import {useFavoriteVideo} from '../../../hooks/useFavoriteVideo';

type IProps = {
  viewCount: number;
  video: IVideo;
};

export const VideoStateComponent: React.FC<IProps> = ({viewCount, video}) => {
  const theme = useTheme();
  const {handleAddFavoriteVideo, handleRemoveFavorite, isLoading, isFavorite} =
    useFavoriteVideo();
  const [videoLikeCount, setVideoLikeCount] = useState<number>(0);
  const [isVideoLiked, setVideoLiked] = useState<boolean>();
  const {user} = useAppSelector(state => state.auth);

  const onHandleVideoLike = async () => {
    if (!isVideoLiked) {
    }
  };

  const onHandleVideoUnlike = async () => {};

  useEffect(() => {
    getIsVideoLiked();
  }, [video, user]);

  useEffect(() => {
    getVideoLikeCount();
  }, [video, user]);

  const getVideoLikeCount = async () => {};

  const getIsVideoLiked = async () => {};

  const isFavorited = isFavorite(video.entityId);

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
        text={videoLikeCount}
        name={isVideoLiked ? 'favorite' : 'favorite-outline'}
        pack="material"
        size={28}
        onPress={isVideoLiked ? onHandleVideoUnlike : onHandleVideoLike}
      />

      <VideoStateButton
        isLoading={isLoading}
        name={isFavorited ? 'bookmark-minus' : 'bookmark-minus-outline'}
        pack="material-community"
        size={28}
        color={isFavorited ? theme[ThemeColorKey.primary500] : '#000'}
        onPress={() => {
          isFavorited
            ? handleRemoveFavorite(video.entityId)
            : handleAddFavoriteVideo(video.entityId);
        }}
      />
    </View>
  );
};
