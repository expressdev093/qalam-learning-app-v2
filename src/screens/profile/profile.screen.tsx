import {
  Layout,
  Menu,
  MenuItem,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../navigations/root/types';
import {Icon} from '../../components/icon';
import {AuthActions} from '../../redux/reducers/auth.reducer';
import {FocusAwareStatusBar} from '../../components/focus-aware-statusbar';
import {ThemeColorKey} from '../../constants/colors';
import {ProfilePicture} from './components/profile-picture';
import {RouteNames} from '../../navigations/constants/route.name';
import {BoardClassDetail} from './components/board-class-detail';

export const ProfileScreen = () => {
  const theme = useTheme();
  const {user} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootStackNavigationProp<any>>();
  const styles = useStyleSheet(themedStyle);

  const ForwardIcon = (props: any) => (
    <Icon {...props} name="arrow-ios-forward" />
  );

  const handleExternalLinkPress = async (url: string) => {
    await Linking.openURL(url);
    // Check if the link is supported
    // const supported = await Linking.canOpenURL(url);

    // if (supported) {
    //   // Open the link in the user's preferred app
    //   await Linking.openURL(url);
    // } else {
    //   console.log(`Don't know how to open URL: ${url}`);
    // }
  };

  const onLogout = () => {
    // navigation.replace(RouteNames.authentication);
    // dispatch(AuthActions.logout());
  };
  return (
    <Layout style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={theme[ThemeColorKey.backgroundBasicColor1]}
        barStyle="dark-content"
      />
      <View style={styles.profileCard}>
        <ProfilePicture />
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text category="h5">{`${user?.firstName} ${user?.lastName}`}</Text>
            <TouchableOpacity
              style={styles.editButtonView}
              onPress={() => navigation.navigate(RouteNames.profileEdit)}>
              <Icon name="edit" pack="antdesign" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <BoardClassDetail />
        </View>
      </View>
      <View style={{height: 20}} />
      <View style={styles.menuCard}>
        <Menu style={{backgroundColor: 'transparent'}}>
          <MenuItem
            onPress={() => navigation.navigate(RouteNames.changePassword)}
            title="Change Password"
            style={styles.menuItem}
            accessoryLeft={props => (
              <Icon
                {...props}
                name="form-textbox-password"
                pack="material-community"
              />
            )}
            accessoryRight={ForwardIcon}
          />
          <MenuItem
            onPress={() => navigation.navigate(RouteNames.contactUs)}
            title="Contacts Us"
            style={styles.menuItem}
            accessoryRight={ForwardIcon}
            accessoryLeft={props => (
              <Icon {...props} name="phone" pack="feather" />
            )}
          />
          <MenuItem
            onPress={() => navigation.navigate(RouteNames.privacyPolicy)}
            title="Privacy Policy"
            style={styles.menuItem}
            accessoryRight={ForwardIcon}
            accessoryLeft={props => (
              <Icon {...props} name="policy" pack="material" />
            )}
          />
          <MenuItem
            onPress={() => navigation.navigate(RouteNames.privacyPolicy)}
            title="Terms And Conditions"
            style={styles.menuItem}
            accessoryRight={ForwardIcon}
            accessoryLeft={props => (
              <Icon {...props} name="file-text" pack="feather" />
            )}
          />
          <MenuItem
            onPress={onLogout}
            title="Logout"
            style={styles.menuItem}
            accessoryRight={ForwardIcon}
            accessoryLeft={props => (
              <Icon {...props} name="logout" pack="simple-line" />
            )}
          />
        </Menu>
      </View>
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: 'white',
    height: 250,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  menuCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  menuItem: {
    backgroundColor: 'white',
  },
  editButtonView: {
    width: 30,
    height: 30,
    backgroundColor: 'color-primary-500',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginLeft: 5,
  },
});
