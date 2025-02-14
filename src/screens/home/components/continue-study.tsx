import React from 'react';
import {StudiesHorizontalList} from '../../continue-study/list/studies';
import {useAppSelector} from '../../../redux';
import {useList} from '@refinedev/core';
import {ITopicVideo} from '../../../interfaces';

export const ContinueStudy = () => {
  const {topicVideos} = useAppSelector(state => state.continueStudy);
  // const topicVideoState = useList<ITopicVideo>({
  //   resource: 'topic-videos',
  // });

  return (
    <StudiesHorizontalList heading="Continue Study" topicVideos={topicVideos} />
  );
};
