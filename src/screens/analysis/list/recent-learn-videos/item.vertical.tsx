import {Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {personImage} from '../../../../components/svgs';
import {Utils} from '../../../../constants/utils';
import {IRecentlyLearnVideo} from '../../../../interfaces';
import {Icon} from '../../../../components/icon';

//Learning
//Vectors and Equilibrium
//Vectors & Equilibrium
//We have positively disrupted our own …

type IProps = {
  recentlyLearnVideo: IRecentlyLearnVideo;
};

export const RecentLearnVideoItemVertical: React.FC<IProps> = ({
  recentlyLearnVideo,
}) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.grandientColor}
        useAngle
        angle={90}
        style={styles.gradientView}>
        <Image source={personImage} style={{alignSelf: 'flex-end'}} />
        <View style={{flex: 1}}>
          <Text category="h5" style={styles.colorWhite}>
            {recentlyLearnVideo.topicVideo?.topic?.name}
          </Text>
          <Text
            style={[styles.colorWhite, {marginRight: 5, fontSize: 12}]}
            numberOfLines={2}>
            {Utils.removeHtmlTags(
              recentlyLearnVideo.topicVideo?.topic?.description,
            )}
          </Text>
        </View>
      </LinearGradient>
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
          <Text style={styles.title}>
            {recentlyLearnVideo.topicVideo?.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {Utils.removeHtmlTags(recentlyLearnVideo.topicVideo?.description)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 5,
  },
  gradientView: {
    height: 95,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  colorWhite: {
    color: 'white',
  },
  videoIcon: {
    width: 40,
    height: 40,
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
  content: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 5,
  },
});
