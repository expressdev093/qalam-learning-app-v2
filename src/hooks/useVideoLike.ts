import {useCreate, useDelete, useList, useOne} from '@refinedev/core';
import React, {useEffect, useMemo, useState} from 'react';
import {ITopicVideo, IVideo, IVideoLike} from '../interfaces';
import {useAppSelector} from '../redux';

type Props = {
  defaultVideoLikeCount: number;
  videoId: number;
};

export const useVideoLike = ({defaultVideoLikeCount, videoId}: Props) => {
  const {user, token} = useAppSelector(state => state.auth);
  const [likeCount, setLikeCount] = useState<number>(defaultVideoLikeCount);
  const likeVideoMutation = useCreate<ITopicVideo>();
  const unlikeVideoMutation = useDelete<ITopicVideo>();
  const videoLikeState = useList<IVideoLike>({
    resource: 'video-likes',
    filters: [
      {
        field: 'userId',
        operator: 'eq',
        value: user?.id,
      },
      {
        field: 'videoId',
        operator: 'eq',
        value: videoId,
      },
      {
        field: 'isLiked',
        operator: 'eq',
        value: true,
      },
    ],
  });

  useEffect(() => {
    setLikeCount(defaultVideoLikeCount);
  }, [defaultVideoLikeCount]);

  const isVideoLiked = useMemo(() => {
    return videoLikeState.data?.data && videoLikeState.data.data.length > 0;
  }, [videoLikeState]);

  const handleLike = async () => {
    likeVideoMutation.mutateAsync(
      {
        resource: 'video-likes',
        values: {
          isLiked: true,
          userId: user?.id,
          videoId: videoId,
        },
        meta: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
      {
        onSuccess: data => {
          setLikeCount(data.data.likes);
          videoLikeState.refetch();
        },
      },
    );
  };

  const handleUnLike = async () => {
    unlikeVideoMutation.mutateAsync(
      {
        resource: 'video-likes/unlike',
        id: videoId,
        meta: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
      {
        onSuccess: data => {
          setLikeCount(data.data.likes);
          videoLikeState.refetch();
        },
      },
    );
  };

  return {
    isLoading: likeVideoMutation.isLoading || unlikeVideoMutation.isLoading,
    isError: likeVideoMutation.isError || unlikeVideoMutation.isError,
    error: likeVideoMutation.error || unlikeVideoMutation.error,
    likeCount,
    handleLike,
    handleUnLike,
    isVideoLiked,
  };
};
