import {Header, PlatformPressable} from '@react-navigation/elements';
import React from 'react';

import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {DrawerActions} from '@react-navigation/native';
import {
  Bookmark,
  DrawerMenu,
  LogoPrimary,
  NotificationBing,
} from '../../../components/svgs';
import {RouteNames} from '../../constants/route.name';
import {IS_ANDROID} from '../../../constants/platform';

type Props = BottomTabHeaderProps & {
  headerTitleAlign?: 'center' | 'left' | undefined;
};

const NotificationIconView = () => {
  const styles = useStyleSheet(themedStyle);
  return (
    <View>
      {/* <NotificationBing /> */}
      <View style={styles.notificationDot} />
    </View>
  );
};

export const HomeHeader: React.FC<Props> = ({headerTitleAlign, ...props}) => {
  const styles = useStyleSheet(themedStyle);

  const handleDrawerOpen = () => {
    props.navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <Header
      headerShadowVisible={false}
      headerStyle={styles.header}
      title="Home"
      headerTitleAlign={headerTitleAlign}
      headerLeft={_ => (
        <TouchableOpacity onPress={handleDrawerOpen}>
          {/* <DrawerMenu /> */}
        </TouchableOpacity>
      )}
      // headerTitle={props => <LogoPrimary height={IS_ANDROID ? 60 : 70} />}
      headerRight={_ => {
        return (
          <React.Fragment>
            <PlatformPressable
              onPress={() =>
                props.navigation.navigate(RouteNames.notifications)
              }>
              <Text>Click</Text>
              {/* <NotificationIconView /> */}
            </PlatformPressable>
            <View style={{width: 20}} />
            <PlatformPressable
              onPress={() => props.navigation.navigate(RouteNames.favorites)}>
              <Text>Click</Text>
              {/* <Bookmark /> */}
            </PlatformPressable>
          </React.Fragment>
        );
      }}
      headerRightContainerStyle={{
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
      headerLeftContainerStyle={{
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    />
  );
};

const themedStyle = StyleService.create({
  header: {
    ...Platform.select({
      ios: {
        height: 120,
      },
      android: {
        height: 70,
      },
    }),
    backgroundColor: 'background-basic-color-1',
    shadowColor: 'transparent',
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    position: 'absolute',
    right: 0,
    top: -5,
    backgroundColor: 'color-secondary',
  },
});
