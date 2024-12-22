import {Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../constants/colors';
import {View} from 'react-native-animatable';
import {learnAnalysisImage} from '../../../components/svgs';

export const LearnAnalysisCard = () => {
  const styles = useStyleSheet(themedStyle);

  return (
    <LinearGradient
      colors={Colors.grandientColor}
      angle={90}
      useAngle
      style={styles.grandientView}>
      <View style={styles.content}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>learning analysis</Text>
          <Text style={styles.description}>
            judge your capabilities with learning analysis
          </Text>
        </View>
        <Image source={learnAnalysisImage} />
      </View>
    </LinearGradient>
  );
};

const themedStyle = StyleSheet.create({
  grandientView: {
    height: 100,
    borderRadius: 20,
    marginTop: 20,
  },
  arrowButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
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
