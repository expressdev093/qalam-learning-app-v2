import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Icon, Text, useStyleSheet} from '@ui-kitten/components';
import {PlatformPressable} from '@react-navigation/elements';
import {BASE_URL} from '@env';
import {Colors} from '../../../../constants/colors';
import {Utils} from '../../../../constants/utils';
import {ITopicVideo} from '../../../../interfaces';

type Props = {
  index: number;
  topicVideo: ITopicVideo;
  onEnrollClick: (topicVideo: ITopicVideo) => void;
};

const getItemBackgroundColor = (index: number) => {
  const colors = [
    Colors.secondary3,
    Colors.secondary,
    Colors.primary,
    Colors.secondary2,
    Colors.primary2,
  ];
  return colors[index % colors.length];
};

const addAlpha = (hexColor: string, alpha: number = 0.8) => {
  return (
    hexColor +
    Math.round(alpha * 255)
      .toString(16)
      .toUpperCase()
      .padStart(2, '0')
  );
};

export const StudyVerticalItem: React.FC<Props> = ({
  index,
  topicVideo,
  onEnrollClick,
}) => {
  const styles = useStyleSheet(themedStyle);
  const hexColor = getItemBackgroundColor(index);
  const colorWithAlpha = addAlpha(hexColor);

  const renderHeader = (
    <View style={styles.header}>
      <Text style={styles.title} category="h5">
        {topicVideo.title}
      </Text>
      <View style={styles.chapterView}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>01</Text>
        <Text category="p2" style={{fontWeight: 'bold'}}>
          Chapter
        </Text>
      </View>
    </View>
  );

  const renderButton = (
    <PlatformPressable
      style={styles.button}
      onPress={() => onEnrollClick?.(topicVideo)}>
      <Text style={{color: 'white'}}>Enroll</Text>
      <Icon size={28} name="arrow-forward-outline" color="white" />
    </PlatformPressable>
  );

  return (
    <ImageBackground
      borderRadius={20}
      source={{uri: BASE_URL + '/' + topicVideo.thumbnail}}
      resizeMode="stretch"
      resizeMethod="resize"
      style={styles.container}>
      <View style={styles.content}>
        {renderHeader}
        <View style={[styles.card, {backgroundColor: colorWithAlpha}]}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.p} numberOfLines={3}>
              {Utils.removeHtmlTags(topicVideo.description)}
            </Text>
            <PlatformPressable style={styles.playButtonCircle}>
              <Icon
                size={24}
                name="play-arrow"
                pack="material"
                style={styles.icon}
              />
            </PlatformPressable>
          </View>
          {renderButton}
        </View>
      </View>
    </ImageBackground>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    height: 250,
  },
  content: {
    padding: 10,
    flex: 1,
  },
  button: {
    borderColor: 'white',
    borderWidth: 2,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapterView: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  title: {
    fontWeight: 'bold',
    marginRight: 20,
    flex: 1,
    color: 'white',
  },
  description: {
    marginTop: 3,
    fontSize: 12,
  },
  icon: {
    color: 'color-primary-500',
  },
  card: {
    flex: 1,
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  p: {
    color: 'white',
    flex: 1,
  },
});
