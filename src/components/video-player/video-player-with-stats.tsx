import {Text} from '@ui-kitten/components';
import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import CustomVideoPlayer from './video-player';
import {IVideoData} from '../../interfaces';
import Config from 'react-native-config';
import {OnProgressData} from 'react-native-video';
import {VideoStateComponent} from './video-states.component';

type Props = {
  watchCounts: number;
  likes: number;
  viewCountThreshold?: number;
  videoData: IVideoData;
  onVideoWatchCountCallback?: (videoId: number) => void;
  onStartVideoCallback?: (videoId: number) => void;
  onEndVideoCallback?: (videoId: number) => void;
};

export const VideoPlayerWithStats: React.FC<Props> = ({
  watchCounts,
  likes,
  viewCountThreshold = 0.5,
  videoData,
  onVideoWatchCountCallback,
  onStartVideoCallback,
  onEndVideoCallback,
}) => {
  const onHandleProgress = async (progress: OnProgressData) => {
    const videoDuration = progress.seekableDuration;
    const currentTime = progress.currentTime;
    const watchedPercentage = currentTime / videoDuration;

    // Check if the watched percentage exceeds the threshold
    if (watchedPercentage >= viewCountThreshold) {
      // Increment view count when the threshold is reached
      onVideoWatchCountCallback?.(videoData.videoId);
    }
  };

  const onStartVideo = async () => {
    onStartVideoCallback?.(videoData.videoId);
  };

  const onEndVideo = async () => {
    onEndVideoCallback?.(videoData.videoId);
  };
  console.log(Config.BASE_URL + '/' + videoData?.url);
  return (
    <View style={{width: '100%'}}>
      <CustomVideoPlayer
        videoQualities={[]}
        onHandleProgress={onHandleProgress}
        video={videoData}
        source={{uri: Config.BASE_URL + '/' + videoData?.url}}
        poster={Config.BASE_URL + '/' + videoData?.thumbnailUrl}
        onStartVideo={onStartVideo}
        onEndVideo={onEndVideo}
        style={{
          ...Platform.select({
            ios: {
              height: 300,
            },
            android: {
              height: 250,
            },
          }),
        }}
      />
      <View style={styles.content}>
        <Text category="h6">{videoData?.title}</Text>
        <VideoStateComponent
          viewCount={watchCounts}
          likes={likes}
          videoId={videoData.videoId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
