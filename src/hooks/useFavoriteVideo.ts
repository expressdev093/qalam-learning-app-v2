/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../redux';
import {useCreate, useDelete, useList} from '@refinedev/core';
import {IFavoriteVideo} from '../interfaces';
import {FavoriteActions} from '../redux/reducers/favorite.reducer';
import Toast from 'react-native-toast-message';
import {Utils} from '../constants/utils';

export const useFavoriteVideo = () => {
  const addToFavoriteMutation = useCreate<IFavoriteVideo>();
  const removeFavoriteMutation = useDelete<IFavoriteVideo>();
  const dispatch = useAppDispatch();
  const {user, token, isLoggedIn} = useAppSelector(state => state.auth);
  const {isFavoriteLoaded, favoriteVideos: localFavoriteVideos} =
    useAppSelector(state => state.favorite);

  const favoriteVideoState = useList<IFavoriteVideo>({
    resource: 'favorite-videos',
    filters: [
      {
        field: 'userId',
        operator: 'eq',
        value: user?.id,
      },
    ],
    queryOptions: {
      enabled: isLoggedIn && user && !isFavoriteLoaded,
      onSuccess(data) {
        dispatch(FavoriteActions.addList(data.data || []));
      },
    },
    pagination: {
      mode: 'off',
    },
    meta: {
      join: [
        {field: 'topicVideo'},
        {field: 'topicVideo.topic'},
        {field: 'topicVideo.topic.chapter'},
        {field: 'topicVideo.topic.subject'},
      ],
    },
  });

  const favoriteVideos = favoriteVideoState.data?.data || [];
  // useEffect(() => {
  //   if (isLoggedIn && !isFavoriteLoaded) {
  //     favoriteVideoState.refetch();
  //   }
  // }, [isLoggedIn, isFavoriteLoaded]);

  const handleAddFavoriteVideo = async (videoId: number) => {
    addToFavoriteMutation.mutateAsync(
      {
        resource: 'favorite-videos',
        values: {
          userId: user?.id!,
          topicVideoId: videoId,
        },
        meta: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
      {
        onSuccess: data => {
          dispatch(FavoriteActions.add(data.data));
          Toast.show({
            type: 'success',
            text1: 'Favorite',
            text2: 'Video added to favorite',
          });
        },
        onError: error => {
          console.log(error);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: Utils.getErrorMessage(error),
          });
        },
      },
    );
  };
  const handleRemoveFavorite = async (videoId: number) => {
    const video = localFavoriteVideos.find(v => v.topicVideoId === videoId);
    removeFavoriteMutation.mutateAsync(
      {
        resource: 'favorite-videos',
        id: video?.id!,
        meta: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
      {
        onSuccess: data => {
          dispatch(FavoriteActions.remove(videoId));
        },
      },
    );
  };

  const isFavorite = (videoId: number) =>
    localFavoriteVideos.find(f => f.topicVideoId === videoId) !== undefined;

  return {
    isLoading:
      // favoriteVideoState.isLoading ||
      addToFavoriteMutation.isLoading || removeFavoriteMutation.isLoading,
    isError: addToFavoriteMutation.isError || removeFavoriteMutation.isError,
    error: addToFavoriteMutation.error || removeFavoriteMutation.error,
    isFavoriteLoaded,
    favoriteVideos,
    favoriteVideoState,
    handleRemoveFavorite,
    handleAddFavoriteVideo,
    isFavorite,
  };
};
