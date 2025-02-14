import {Input} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import {Colors} from '../../../constants/colors';
import {PlatformPressable} from '@react-navigation/elements';
import {Icon} from '../../../components/icon';
import {Filter} from '../../../components/svgs';

export const Search = () => {
  return (
    <Input
      placeholder="Find Course"
      style={styles.container}
      textStyle={{paddingVertical: 6, lineHeight: 21}}
      accessoryLeft={props => (
        <Icon {...props} name="search" pack="feather" color={Colors.grayIcon} />
      )}
      accessoryRight={props => (
        <PlatformPressable>
          <Filter {...props} />
        </PlatformPressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 0,
    alignItems: 'center',
    height: 40,
  },
});
