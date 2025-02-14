import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from 'react-native';
import Video, {
  OnLoadData,
  OnProgressData,
  OnSeekData,
  VideoRef,
  ReactVideoProps,
} from 'react-native-video';
import {useStyleSheet} from '@ui-kitten/components';
import {Icon} from '../icon';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackNavigationProp} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import BackHeaderButton from '../buttons/back-header.button';
import {IVideoData, IVideoQuality} from '../../interfaces';
import {VideoQualitySelector} from '../select';

const HIDE_CONTROLS_DELAY = 1500; // 1.5 seconds
let hideControlsTimeout: any;

type Props = ReactVideoProps & {
  video?: IVideoData;
  onHandleProgress?: (progress: OnProgressData) => void;
  onStartVideo?: () => void;
  onEndVideo?: () => void;
  videoQualities: IVideoQuality[];
  isLoading?: boolean;
};

export const CustomVideoPlayer: React.FC<Props> = ({
  video,
  source,
  onHandleProgress,
  onStartVideo,
  videoQualities,
  onEndVideo,
  isLoading,
  ...restVideoProps
}) => {
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<RootStackNavigationProp<RouteNames.topicVideo>>();
  const {width} = useWindowDimensions();
  const styles = useStyleSheet(themedStyle);
  const videoRef = useRef<VideoRef>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isMuted, setIsMuted] = React.useState<boolean>(false);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const togglePlaying = () => {
    setIsPlaying(prevPlaying => !prevPlaying);
    onStartVideo?.();
    if (isPlaying) {
      setShowControls(true);
    }
  };

  const onVideoEnd = () => {
    onEndVideo?.();
    setIsPlaying(false);
  };

  const onProgress = (data: OnProgressData) => {
    setCurrentTime(data.currentTime);
    onHandleProgress?.(data);
    // if (data.currentTime >= data.playableDuration) {
    //   onVideoEnd;
    // }
  };

  const handleSeek = ({seekTime}: OnSeekData) => {
    videoRef.current?.seek(seekTime);
    setCurrentTime(seekTime);
  };

  const onLoad = (data: OnLoadData) => {
    setDuration(data.duration);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onTouchEnd = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, HIDE_CONTROLS_DELAY);
  };

  const toggleFullScreen = () => {
    if (fullscreen) {
      videoRef.current?.dismissFullscreenPlayer();
    } else {
      videoRef.current?.presentFullscreenPlayer();
    }
  };

  const handleBackButton = () => {
    if (fullscreen) {
      toggleFullScreen();
    } else {
      navigation.goBack();
    }
  };

  const renderReplayBack = (
    <TouchableOpacity
      onPress={() =>
        handleSeek({
          currentTime: currentTime,
          seekTime: currentTime - 10,
        })
      }>
      <Icon name={'replay-10'} pack="material" size={28} color="#fff" />
    </TouchableOpacity>
  );

  const renderReplayFoward = (
    <TouchableOpacity
      onPress={() =>
        handleSeek({
          currentTime: currentTime,
          seekTime: currentTime + 10,
        })
      }>
      <Icon name={'forward-10'} pack="material" size={28} color="#fff" />
    </TouchableOpacity>
  );

  // Callback to handle the selected video quality
  const handleVideoQualitySelect = (quality: IVideoQuality): void => {
    setSelectedQuality(quality.resolution); // Update the selected quality
    console.log('Selected Video Quality:', quality); // Optionally log the quality
  };

  return (
    <View
      style={fullscreen ? styles.backgroundVideoFullScreen : styles.container}>
      <Video
        onTouchEnd={onTouchEnd}
        ref={videoRef}
        source={source}
        paused={!isPlaying}
        controls={false}
        style={
          fullscreen ? styles.backgroundVideoFullScreen : styles.backgroundVideo
        }
        muted={isMuted}
        posterResizeMode="cover"
        onEnd={onVideoEnd}
        onProgress={onProgress}
        onLoad={onLoad}
        resizeMode={fullscreen ? 'contain' : 'cover'}
        progressUpdateInterval={1000}
        allowsExternalPlayback
        onFullscreenPlayerWillPresent={() => setFullscreen(true)}
        onFullscreenPlayerWillDismiss={() => setFullscreen(false)}
        fullscreenOrientation="landscape"
        fullscreenAutorotate
        {...restVideoProps}
      />
      {showControls && (
        <View style={styles.controlOverlay}>
          <View style={styles.controlRow} onTouchEnd={onTouchEnd}>
            {isPlaying && renderReplayBack}
            <TouchableOpacity style={styles.playButton} onPress={togglePlaying}>
              <Icon
                name={isPlaying ? 'pause' : 'play-arrow'}
                pack="material"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
            {isPlaying && renderReplayFoward}
          </View>
          {isPlaying && (
            <View style={styles.sliderControlView}>
              <View style={styles.row}>
                <View>
                  <View style={[styles.row, {marginRight: 15}]}>
                    <Text style={styles.time}>{formatTime(currentTime)}</Text>
                    <Text style={styles.time}>{formatTime(duration)}</Text>
                  </View>
                  <Slider
                    style={[{width: width - 50}, styles.slider]}
                    minimumValue={0}
                    value={currentTime}
                    maximumValue={duration}
                    minimumTrackTintColor={Colors.primary}
                    maximumTrackTintColor="#fff"
                    thumbTintColor={Colors.primary}
                    onValueChange={value => setCurrentTime(value)}
                    onSlidingComplete={value => {
                      if (videoRef.current) {
                        videoRef.current.seek(value);
                      }
                    }}
                  />
                </View>
                <TouchableOpacity onPress={toggleFullScreen}>
                  <Icon
                    name={fullscreen ? 'fullscreen-exit' : 'fullscreen'}
                    pack="material"
                    color="#fff"
                    size={28}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
      <View style={[styles.toolbar, {marginTop: insets.top - 10}]}>
        {showControls && (
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <BackHeaderButton
              color={fullscreen ? '#fff' : '#000'}
              onPress={handleBackButton}
            />
            {/* <VideoQualitySelector
              videoQualities={videoQualities}
              onQualitySelect={handleVideoQualitySelect}
            /> */}
          </View>
        )}
        {fullscreen && showControls && (
          <View style={styles.titleView}>
            <Text numberOfLines={1} style={styles.title}>
              {video?.title}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleView: {
    backgroundColor: 'rgba(0,0,0,.5)',
    alignSelf: 'center',

    padding: 5,
    borderRadius: 10,
    marginLeft: 10,
  },
  title: {
    color: 'white',
  },
  toolbar: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 3,
    padding: 20,
    alignItems: 'center',
  },
  backgroundVideo: {
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backgroundVideoFullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#000',
  },
  controlOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  controlRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-around',
  },
  playButton: {
    backgroundColor: 'color-primary-500',
    height: 60,
    width: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderControlView: {
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
  },
  slider: {
    //width: width - 80,
  },
  time: {
    color: 'white',
    paddingLeft: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settings: {
    position: 'absolute',
    right: 0,
  },
});

export default CustomVideoPlayer;
