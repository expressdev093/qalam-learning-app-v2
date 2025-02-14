import {useCreate, useUpdate} from '@refinedev/core';
import React, {useEffect, useState} from 'react';
import {ITopicVideo} from '../interfaces';
import {useAppSelector} from '../redux';

type Props = {
  defaultViewCount: number;
  vidoeId: number;
};

export const useVideoViewCount = ({vidoeId, defaultViewCount}: Props) => {
  const {token} = useAppSelector(state => state.auth);
  const videoViewMutation = useUpdate<ITopicVideo>();
  const [viewCount, setViewCount] = useState<number>(0);
  const [isVideoViewCounted, setVideoViewCounted] = useState<boolean>(false);

  useEffect(() => {
    setViewCount(defaultViewCount);
  }, [defaultViewCount]);

  const handleWatchVideo = async () => {
    setVideoViewCounted(true);
    videoViewMutation.mutateAsync(
      {
        resource: 'topic-videos/watch',
        id: vidoeId,
        values: {},
        meta: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
      {
        onSuccess: data => {
          setViewCount(data.data.views);
        },
        onError: () => {
          setVideoViewCounted(false);
        },
      },
    );
  };
  return {
    isLoading: videoViewMutation.isLoading,
    isError: videoViewMutation.isError,
    error: videoViewMutation.error,
    handleWatchVideo,
    isVideoViewCounted,
    viewCount,
  };
};
