import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text, useStyleSheet} from '@ui-kitten/components';
import {BASE_URL} from '@env';
import {ITopicVideo} from '../../../../interfaces';
import {Icon} from '../../../../components/icon';

type Props = {
  topicVideo: ITopicVideo;
};

export const TopPickHorizontalItem: React.FC<Props> = ({topicVideo}) => {
  const styles = useStyleSheet(themedStyle);
  const {title, description, url, thumbnail} = topicVideo;

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Image
          source={{uri: BASE_URL + '/' + thumbnail}}
          resizeMode="stretch"
          style={{width: 140, height: 140, borderRadius: 20}}
        />
        <View style={styles.playButtonCircle}>
          <Icon
            size={24}
            name="play-arrow"
            pack="material"
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    width: 150,
  },
  content: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },

  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonCircle: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  videoIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'color-primary-500',
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  description: {
    marginTop: 3,
    fontSize: 12,
  },
  icon: {
    color: 'color-primary-500',
  },
});
