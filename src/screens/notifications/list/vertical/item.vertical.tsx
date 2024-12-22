import {Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Microscope} from '../../../../components/svgs';
import {Icon} from '../../../../components/icon';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const getItemBackgroundColor = (index: number) => {
  const colors = ['#D4604C', '#339FFA', '#CD48D9', '#64DC9B', '#D4604C'];
  return colors[index % colors.length];
};

const addAlpha = (hexColor: string, alpha: number = 0.5) => {
  return (
    hexColor +
    Math.round(alpha * 255)
      .toString(16)
      .toUpperCase()
      .padStart(2, '0')
  );
};

type IProps = {
  index: number;
};

export const NotificationItemVertical: React.FC<IProps> = ({index}) => {
  const styles = useStyleSheet(themedStyle);

  const hexColor = getItemBackgroundColor(index);
  const colorWithAlpha = addAlpha(hexColor);
  return (
    <View style={styles.conatiner}>
      {/* Box */}
      <View style={[styles.box, {backgroundColor: colorWithAlpha}]}>
        <Microscope color={hexColor} width={50} height={50} />
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.labelView}>
            <Text style={styles.label}>Computer</Text>
          </View>
        </View>
        <Text style={styles.title}>Programming</Text>
        <View style={styles.row}>
          <Text
            style={styles.description}
            category="p1"
            numberOfLines={2}
            ellipsizeMode="tail">
            Object Oriented Programming Language
          </Text>
          <View style={styles.clockView}>
            <Icon
              name="clock-outline"
              size={18}
              color={Colors.grayIcon}
              pack="material-community"
            />
            <Text style={styles.time} category="c1">
              05:30pm
            </Text>
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
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
    marginTop: -2,
  },
  description: {
    fontSize: 11,
    marginTop: -2,
    padding: 0,
    flex: 1,
    color: 'color-gray-icon',
  },
  time: {
    marginLeft: 2,
    marginTop: 2,
    color: 'color-gray-icon',
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
