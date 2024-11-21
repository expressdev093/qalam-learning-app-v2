import {Avatar, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import {RenderProp} from '@ui-kitten/components/devsupport';
import React from 'react';
import {ViewProps} from 'react-native';
import {View} from 'react-native-animatable';
import {useAppSelector} from '../../redux';
import {BASE_URL} from '@env';

export const HomeDrawerContentHeader: React.FC<ViewProps> = ({}) => {
  const {user} = useAppSelector(state => state.auth);
  const styles = useStyleSheet(themedStyles);
  const url = user?.avatar?.includes('uploads')
    ? `${BASE_URL}/${user.avatar}`
    : user?.avatar;
  return (
    <View style={styles.container}>
      <Avatar
        source={{uri: url}}
        size="giant"
        style={{height: 80, width: 80}}
      />
      <Text category="h5">{`${user?.firstName} ${user?.lastName}`}</Text>
      <Text>{user?.email}</Text>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 25,
  },
});
