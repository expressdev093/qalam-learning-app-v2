/* eslint-disable react/no-unstable-nested-components */
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {
  Drawer,
  DrawerItem,
  IndexPath,
  StyleService,
  Text,
  TextProps,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon} from '../../components/icon';
import {Sizes} from '../../constants/sizes';
import {HomeDrawerContentHeader} from './header';
import {useAppDispatch} from '../../redux';
import {AuthActions} from '../../redux/reducers/auth.reducer';
import {RouteNames} from '../constants/route.name';
import {CommonActions} from '@react-navigation/native';
const Title: React.FC<{textProps?: TextProps; title: string}> = ({
  textProps,
  title,
}) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <Text {...textProps} style={[textProps?.style, styles.title]}>
      {title}
    </Text>
  );
};

export const HomeDrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
  state,
}) => {
  const dispatch = useAppDispatch();
  const {bottom} = useSafeAreaInsets();
  const styles = useStyleSheet(themedStyle);

  const handleSelect = (index: IndexPath) => {
    navigation.navigate(state.routeNames[index.row]);
  };

  const getDrawerItemStyle = (index: number) => {
    return state.index !== index
      ? {backgroundColor: 'white', paddingLeft: 40}
      : {paddingLeft: 40};
  };

  const handleLogout = async () => {
    dispatch(AuthActions.logout());
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: RouteNames.authentication,
          },
        ],
      }),
    );
    // try {
    //   const response = await removeLoginDeviceInfo(
    //     await DeviceInfo.getUniqueId(),
    //   ).unwrap();
    //   dispatch<AuthActions>(setSignOut());
    // } catch (err) {
    //   console.log(err);
    //   dispatch<AuthActions>(setSignOut());
    // }
  };

  const iconColor = '#000';

  return (
    <Drawer
      style={[styles.drawer, {paddingBottom: bottom}]}
      appearance="noDivider"
      selectedIndex={new IndexPath(state.index)}
      onSelect={handleSelect}
      header={props => <HomeDrawerContentHeader {...props} />}
      footer={props => (
        <DrawerItem
          title={titleProps => <Title textProps={titleProps} title="Logout" />}
          accessoryLeft={accLeftProps => (
            <Icon
              {...accLeftProps}
              name="logout"
              pack="material"
              size={Sizes.drawerIconSize}
              color={iconColor}
            />
          )}
          style={getDrawerItemStyle(-1)}
          onPress={handleLogout}
        />
      )}>
      <DrawerItem
        title={props => <Title textProps={props} title="Home" />}
        accessoryLeft={props => (
          <Icon
            {...props}
            name="home"
            pack="feather"
            size={Sizes.drawerIconSize}
            color={iconColor}
          />
        )}
        style={getDrawerItemStyle(0)}
      />
      <DrawerItem
        title={props => <Title textProps={props} title="Profile" />}
        accessoryLeft={props => (
          <Icon
            {...props}
            name="user"
            pack="feather"
            size={Sizes.drawerIconSize}
            color={iconColor}
          />
        )}
        style={getDrawerItemStyle(1)}
      />
      <DrawerItem
        title={props => <Title textProps={props} title="Notifications" />}
        accessoryLeft={props => (
          <Icon
            {...props}
            name="bell"
            pack="feather"
            size={Sizes.drawerIconSize}
            color={iconColor}
          />
        )}
        style={getDrawerItemStyle(2)}
      />
      <DrawerItem
        title={props => <Title textProps={props} title="Favorites" />}
        accessoryLeft={props => (
          <Icon
            {...props}
            name="bookmark-minus-outline"
            size={Sizes.drawerIconSize}
            pack="material-community"
            color={iconColor}
          />
        )}
        style={getDrawerItemStyle(3)}
      />
      <DrawerItem
        title={props => <Title textProps={props} title="About Us" />}
        accessoryLeft={props => (
          <Icon
            {...props}
            name="user-plus"
            pack="feather"
            size={Sizes.drawerIconSize}
            color={iconColor}
          />
        )}
        style={getDrawerItemStyle(4)}
      />
      <DrawerItem
        title={props => <Title textProps={props} title="Privacy Policy" />}
        accessoryLeft={props => (
          <Icon
            {...props}
            name="tooltip-text-outline"
            pack="material-community"
            size={Sizes.drawerIconSize}
            color={iconColor}
          />
        )}
        style={getDrawerItemStyle(5)}
      />
      <DrawerItem
        title={props => <Title textProps={props} title="Support" />}
        accessoryLeft={props => (
          <Icon
            {...props}
            name="help-circle"
            pack="feather"
            size={Sizes.drawerIconSize}
            color={iconColor}
          />
        )}
        style={getDrawerItemStyle(6)}
      />
      <DrawerItem
        title={props => <Title textProps={props} title="Settings" />}
        accessoryLeft={props => (
          <Icon
            {...props}
            name="settings"
            pack="feather"
            size={Sizes.drawerIconSize}
            color={iconColor}
          />
        )}
        style={getDrawerItemStyle(7)}
      />
    </Drawer>
  );
};

const themedStyle = StyleService.create({
  drawer: {
    backgroundColor: 'white',
    display: 'flex',
  },
  title: {
    fontWeight: 'bold',
  },
});
