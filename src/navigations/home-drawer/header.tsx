import {Avatar, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {ViewProps} from 'react-native';
import {View} from 'react-native-animatable';
import {useAppSelector} from '../../redux';
import Config from 'react-native-config';

export const HomeDrawerContentHeader: React.FC<ViewProps> = ({}) => {
  const {user} = useAppSelector(state => state.auth);
  const styles = useStyleSheet(themedStyles);
  const url = user?.avatar?.includes('uploads')
    ? `${Config.BASE_URL}/${user.avatar}`
    : user?.avatar;

  const fallbackUrl = `${Config.BASE_URL}/assets/icons/user.png`;
  return (
    <View style={styles.container}>
      <Avatar
        source={{uri: url || fallbackUrl}}
        size="giant"
        style={{height: 80, width: 80, objectFit: 'cover'}}
      />
      <Text category="h5">{`${user?.firstName} ${user?.lastName}`}</Text>
      <Text>{user?.email}</Text>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25,
  },
});
