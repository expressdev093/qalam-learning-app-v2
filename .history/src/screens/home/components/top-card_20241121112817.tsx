import {Button, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {NerdAmico} from '../../../common/svgs';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../constants/colors';
import {Icon} from '../../../components';
import {IOnlineClass, IVideo} from '../../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../../navigations/route-names';
import Toast from 'react-native-fast-toast';

type IProps = {
  onlineClass: IOnlineClass;
};

export const TopCard: React.FC<IProps> = ({onlineClass}) => {
  const styles = useStyleSheet(themedStyle);
  const navigation = useNavigation<any>();
  const toastRef = useRef<any>(null);

  const onStartNow = () => {
    const topicVideos = onlineClass.topic?.videos ?? [];
    if (!onlineClass.isEnded && topicVideos.length > 0) {
      navigation.navigate(RouteNames.videoStack, {
        video: {
          entityName: 'topic-videos',
          entityId: topicVideos[0].id,
        } as IVideo,
      });
    } else {
      toastRef.current.show('This class is already ended', {
        data: {title: 'Toast title'},
      });
    }
  };

  return (
    <LinearGradient
      colors={Colors.grandientColor}
      angle={90}
      useAngle
      style={styles.container}>
      <View style={styles.content}>
        <View style={styles.detailContent}>
          <Text style={[styles.p]}>Today’S Special Course</Text>
          <Text style={[styles.p]} category="h5">
            {onlineClass.subject?.name}
          </Text>
          <Text style={[styles.p]}>
            Chapter : {onlineClass.chapter?.name as any}
          </Text>
          <Button
            onPress={onStartNow}
            appearance="ghost"
            style={styles.button}
            accessoryRight={props => (
              <Icon {...props} name="arrow-forward-outline" />
            )}>
            Start Now
          </Button>
        </View>
        <View style={styles.iconView}>
          <NerdAmico />
        </View>
      </View>
      <Toast ref={toastRef} />
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
    color: '#fff',
  },
  button: {
    backgroundColor: 'white',
    color: '#000',
    width: '80%',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 11,
  },
});
