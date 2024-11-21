import {Input} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import {Icon} from '../../../components';
import {Colors} from '../../../constants/colors';
import {Filter} from '../../../common/svgs';
import {PlatformPressable} from '@react-navigation/elements';

export const Search = () => {
  return (
    <Input
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
  },
});
