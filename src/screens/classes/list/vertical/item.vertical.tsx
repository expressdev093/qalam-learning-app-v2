import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text, useStyleSheet} from '@ui-kitten/components';
import {PlatformPressable} from '@react-navigation/elements';
import {Colors} from '../../../../constants/colors';
import {IOnlineClass} from '../../../../interfaces';
import {Icon} from '../../../../components/icon';

type Props = {
  onlineClass: IOnlineClass;
  isActive: boolean;
};

export const ClassItemVertical: React.FC<Props> = ({onlineClass, isActive}) => {
  const styles = useStyleSheet(themedStyle);
  isActive = onlineClass.isEnded === false;
  return (
    <LinearGradient
      style={styles.container}
      colors={isActive ? Colors.grandientColor : ['#E2E2E2', '#E2E2E2']}
      useAngle
      angle={90}>
      <View style={styles.content}>
        <Text style={isActive ? styles.white : styles.black} category="h6">
          {onlineClass?.subject?.name}
        </Text>
        <View style={styles.chapterView}>
          <Text style={isActive ? styles.white : styles.black} category="s1">
            Chapter :{' '}
          </Text>
          <Text style={isActive ? styles.white : styles.black} category="p1">
            {onlineClass?.chapter?.name}
          </Text>
        </View>
      </View>
      <PlatformPressable style={styles.playButtonCircle}>
        <Icon size={24} name="play-arrow" pack="material" style={styles.icon} />
      </PlatformPressable>
    </LinearGradient>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    height: 90,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
  },
  playButtonCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  icon: {
    color: 'color-primary-500',
  },
  white: {
    color: 'white',
  },
  black: {
    color: 'rgba(0,0,0,0.3)',
  },
  chapterView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
