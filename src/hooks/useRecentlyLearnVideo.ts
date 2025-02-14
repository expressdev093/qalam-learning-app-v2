import React from 'react';
import {useAppDispatch, useAppSelector} from '../redux';
import {useCreate} from '@refinedev/core';
import {IRecentlyLearnVideo} from '../interfaces';
import {ContineuStudyActions} from '../redux/reducers/continue-study.reducer';

export const useRecentlyLearnVideo = () => {
  const dispatch = useAppDispatch();
  const {user, token} = useAppSelector(state => state.auth);
  const {topicVideos} = useAppSelector(state => state.continueStudy);
  const recentlyLearnVideoMutation = useCreate<IRecentlyLearnVideo>();

  const handleAddRecentlyLearnVideo = (videoId: number) => {
    recentlyLearnVideoMutation.mutateAsync(
      {
        resource: 'recently-learn-videos',
        values: {
          userId: user?.id,
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
          dispatch(ContineuStudyActions.remove(videoId));
        },
      },
    );
  };
  return {
    ...recentlyLearnVideoMutation,
    handleAddRecentlyLearnVideo,
  };
};
