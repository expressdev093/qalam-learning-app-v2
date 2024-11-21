import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text, useStyleSheet} from '@ui-kitten/components';
import {BASE_URL} from '@env';
import {ISubject} from '../../../../interfaces';
import {Microscope} from '../../../../components/svgs';

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

type Props = {
  index: number;
  subject?: ISubject;
};

export const SubjectHorizontalItem: React.FC<Props> = ({subject, index}) => {
  const styles = useStyleSheet(themedStyle);

  const hexColor = getItemBackgroundColor(index);
  const colorWithAlpha = addAlpha(hexColor);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.box,
          {backgroundColor: subject?.color ?? colorWithAlpha},
        ]}>
        {subject?.icon ? (
          <Image
            source={{uri: BASE_URL + '/' + subject.icon}}
            style={{width: 50, height: 50}}
          />
        ) : (
          <Microscope color={hexColor} width={50} height={50} />
        )}
      </View>
      <View>
        <Text category="s1" style={styles.title}>
          {subject?.name}
        </Text>
      </View>
    </View>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    width: 100,
    height: 125,
  },
  box: {
    width: '100%',
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 0,
    textAlign: 'center',
    fontWeight: '700',
  },
});
