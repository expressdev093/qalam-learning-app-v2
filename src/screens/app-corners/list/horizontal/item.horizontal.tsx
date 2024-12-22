import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text, useStyleSheet} from '@ui-kitten/components';
import {PlatformPressable} from '@react-navigation/elements';
import {BASE_URL} from '@env';
import {Utils} from '../../../../constants/utils';
import {IAppCorner} from '../../../../interfaces';
import {Icon} from '../../../../components/icon';

type Props = {
  appCorner: IAppCorner;
};

export const AppCornerHorizontalItem: React.FC<Props> = ({appCorner}) => {
  const styles = useStyleSheet(themedStyle);
  const {title, description, videoThumbnail, image} = appCorner;

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Image
          source={{uri: BASE_URL + '/' + (image ?? videoThumbnail)}}
          style={styles.videoThumbnail as any}
          resizeMode="cover"
        />
        {!image && (
          <PlatformPressable style={styles.playButtonCircle}>
            <Icon
              size={24}
              name="play-arrow"
              pack="material"
              style={styles.icon}
            />
          </PlatformPressable>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.videoIcon}>
          <Icon
            size={24}
            name="play-arrow"
            pack="material"
            style={styles.icon}
          />
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail">
            {Utils.removeHtmlTags(description)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    width: 250,
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
  videoThumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 15,
  },
});
