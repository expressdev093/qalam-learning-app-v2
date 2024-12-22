import {Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../constants/colors';
import {View} from 'react-native-animatable';
import Share from 'react-native-share';
import {ShareWithFriend} from '../../../components/svgs';

export const ShareWithFriendView = () => {
  const styles = useStyleSheet(themedStyle);

  const shareContent = async () => {
    const options = {
      message:
        'Check out this awesome app! https://play.google.com/store/apps/details?id=com.qalam.academy.onlinecourses.onlinelearning',
    };

    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={shareContent}>
      <LinearGradient
        colors={Colors.grandientColor}
        angle={90}
        useAngle
        style={styles.grandientView}>
        <View style={styles.content}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>Share with friends</Text>
            <Text style={styles.description}>
              Help your friends fall in love with learning through Qalam
              Learning
            </Text>
          </View>
          <View style={{flex: 0.4}} />
        </View>
      </LinearGradient>
      <View style={styles.image}>
        <ShareWithFriend />
      </View>
    </TouchableOpacity>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    marginTop: 35,
  },
  grandientView: {
    height: 100,
    borderRadius: 20,
  },
  image: {
    position: 'absolute',
    right: 0,
    top: -30,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    color: 'color-primary-500',
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    color: 'white',
    fontSize: 13,
    marginTop: 3,
  },
});
