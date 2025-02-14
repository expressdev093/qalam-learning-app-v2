import {Button, Text, useStyleSheet, useTheme} from '@ui-kitten/components';
import React, {useRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {Colors, ThemeColorKey} from '../../../constants/colors';
import {IOnlineClass, IVideo} from '../../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {RouteNames} from '../../../navigations/constants/route.name';
import {RootStackNavigationProp} from '../../../navigations/root/types';
import {Icon} from '../../../components/icon';
import {NerdAmico} from '../../../components/svgs';
import {useOne} from '@refinedev/core';
import Toast from 'react-native-toast-message';

type IProps = {};

export const TopCard: React.FC<IProps> = ({}) => {
  const theme = useTheme();
  const {data, isLoading} = useOne<IOnlineClass>({
    resource: 'online-classes',
    id: 1,
    meta: {
      join: [
        {field: 'chapter', select: ['name']},
        {field: 'subject', select: ['name']},
      ],
    },
  });

  const onlineClass = data?.data;

  const toast = useToast();
  const styles = useStyleSheet(themedStyle);
  const navigation =
    useNavigation<RootStackNavigationProp<RouteNames.homeDrawer>>();

  const onStartNow = () => {
    const topicVideos = onlineClass?.topic?.videos ?? [];
    if (!onlineClass?.isEnded && topicVideos.length > 0) {
      // navigation.navigate(RouteNames.videoStack, {
      //   video: {
      //     entityName: 'topic-videos',
      //     entityId: topicVideos[0].id,
      //   } as IVideo,
      // });
    } else {
      Toast.show({
        type: 'info',
        text1: 'Class Info',
        text2: 'This class is already ended',
      });
      //toast.show('This class is already ended');
    }
  };

  const renderLoading = (
    <View style={{height: 60, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={theme[ThemeColorKey.primary500]} />
    </View>
  );

  return isLoading ? (
    renderLoading
  ) : (
    <LinearGradient
      colors={Colors.grandientColor}
      angle={90}
      useAngle
      style={styles.container}>
      <View style={styles.content}>
        <View style={styles.detailContent}>
          <Text style={[styles.p]}>Today’s Special Course</Text>
          <Text style={[styles.p, {color: '#fff'}]} category="h5">
            {onlineClass?.subject?.name}
          </Text>
          <Text style={[styles.p]}>
            Chapter : {onlineClass?.chapter?.name as any}
          </Text>
          <TouchableOpacity onPress={onStartNow} style={styles.button}>
            <Text style={styles.buttonText}>Start Now</Text>
            <Icon
              style={styles.icon}
              name="arrow-forward-outline"
              color={theme[ThemeColorKey.primary500]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconView}>
          <NerdAmico />
        </View>
      </View>
    </LinearGradient>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 200,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailContent: {
    flex: 1.3,
    paddingLeft: 10,
  },
  iconView: {
    flex: 1,
  },
  p: {
    color: '#ffffff90',
  },
  button: {
    backgroundColor: 'white',
    color: '#000',
    width: 141,
    height: 37,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 14,
    color: 'color-primary-500',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  },
});
