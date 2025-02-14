/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View} from 'react-native-animatable';
import {ITopicVideo, IVideoData} from '../../../interfaces';
import {VideoPlayerWithStats} from '../../../components/video-player';
import {useVideoViewCount} from '../../../hooks/useVideoViewCount';
import {useAppDispatch, useAppSelector} from '../../../redux';
import {ContineuStudyActions} from '../../../redux/reducers/continue-study.reducer';
import {StyleSheet} from 'react-native';
import {useRecentlyLearnVideo} from '../../../hooks/useRecentlyLearnVideo';

type Props = {
  topicVideo: ITopicVideo;
};

export const Video: React.FC<Props> = ({topicVideo}) => {
  const {handleAddRecentlyLearnVideo} = useRecentlyLearnVideo();
  const dispatch = useAppDispatch();
  const continueStudy = useAppSelector(state => state.continueStudy);
  const {handleWatchVideo, isVideoViewCounted} = useVideoViewCount({
    defaultViewCount: topicVideo?.views || 0,
    vidoeId: topicVideo.id,
  });
  const videoData: IVideoData = {
    videoId: topicVideo.id,
    title: topicVideo.title,
    description: topicVideo.description,
    url: topicVideo.url,
    thumbnailUrl: topicVideo.thumbnail,
    videoQualities: topicVideo.videoQualities || [],
  };

  const onVideoWatchCount = async (videoId: number) => {
    if (!isVideoViewCounted) {
      await handleWatchVideo();
    }
  };

  const onStartVideo = async (videoId: number) => {
    const notExist =
      continueStudy.topicVideos.find(v => v.id === topicVideo.id) === undefined;
    if (notExist && topicVideo) {
      try {
        dispatch(ContineuStudyActions.add(topicVideo));
      } catch (err) {}
    }
  };

  const onEndVideo = async (videoId: number) => {
    try {
      handleAddRecentlyLearnVideo(videoId);
    } catch (err) {}
  };

  return (
    <View style={{width: '100%'}}>
      <VideoPlayerWithStats
        videoData={videoData}
        watchCounts={topicVideo.views}
        likes={topicVideo.likes}
        onEndVideoCallback={onEndVideo}
        onStartVideoCallback={onStartVideo}
        onVideoWatchCountCallback={onVideoWatchCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
