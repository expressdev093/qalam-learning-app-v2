import {Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Utils} from '../../../../constants/utils';
import {IPastPaper} from '../../../../interfaces';
import Config from 'react-native-config';

type IProps = {
  pastPaper: IPastPaper;
};

export const PastPaperItemVertical: React.FC<IProps> = ({pastPaper}) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <View style={styles.conatiner}>
      <ImageBackground
        source={{uri: Config.BASE_URL + '/' + pastPaper.subject?.image}}
        resizeMode="contain"
        style={styles.imageBg}>
        <View style={styles.overlay}>
          <Text style={{color: '#FFFFFF'}} category="s1">
            {pastPaper.subject?.name}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.labelView}>
            <Text style={styles.label}>{pastPaper.subject?.name}</Text>
          </View>
          <Text category="s1" style={styles.secondarText}>
            {pastPaper.year}
          </Text>
        </View>
        <Text style={styles.title}>{pastPaper.name}</Text>
        <View style={styles.row}>
          <Text
            style={styles.description}
            category="p1"
            numberOfLines={2}
            ellipsizeMode="tail">
            {Utils.removeHtmlTags(pastPaper.description)}
          </Text>
        </View>
      </View>
    </View>
  );
};
const themedStyle = StyleSheet.create({
  conatiner: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    flexDirection: 'row',
  },
  imageBg: {
    height: 80,
    width: 80,
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(86,81,249,0.8)', // Replace with your desired color and opacity
    opacity: 0.5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clockView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelView: {
    backgroundColor: 'color-primary-300',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 5,
  },
  label: {
    color: '#fff',
    fontSize: 14,
  },
  title: {
    marginTop: 0,
  },
  description: {
    fontSize: 11,
    padding: 0,
    flex: 1,
    color: 'color-gray-icon',
  },
  time: {
    marginLeft: 2,
    marginTop: 2,
    color: 'color-gray-icon',
  },
  secondarText: {
    color: 'color-secondary-3',
  },
});
