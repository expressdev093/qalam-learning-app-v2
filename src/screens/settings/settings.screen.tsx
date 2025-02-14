import {
  Layout,
  Menu,
  MenuItem,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React from 'react';
import {Linking, Platform, StyleSheet, View} from 'react-native';
import {PlatformPressable} from '@react-navigation/elements';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../redux';
import {Icon} from '../../components/icon';
import {AuthActions} from '../../redux/reducers/auth.reducer';
import {RouteNames} from '../../navigations/constants/route.name';
import {FocusAwareStatusBar} from '../../components/focus-aware-statusbar';
import {ThemeColorKey} from '../../constants/colors';
import Toast from 'react-native-toast-message';

export const SettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const styles = useStyleSheet(themedStyle);

  const iconColor = '#000';

  const ForwardIcon = (props: any) => (
    <Icon {...props} name="arrow-ios-forward" color={iconColor} />
  );

  const onLogout = () => {
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
    dispatch(AuthActions.logout());
  };

  const storeUrl = Platform.select({
    // Change the App ID for iOS to your app's ID
    ios: 'itms-apps://itunes.apple.com/us/app/app-name/idAPP_ID?mt=8',
    // Change the Package Name for Android to your app's package name
    android: 'market://details?id=com.example.appname',
  });

  const handleRateUsPress = () => {
    Linking.openURL(storeUrl as any).catch(() => {
      console.warn('Failed to open store URL');
    });
  };

  const handleExternalLinkPress = async (url: string) => {
    // Check if the link is supported
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Open the link in the user's preferred app
      await Linking.openURL(url);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "Don't know how to open URL",
      });
    }
  };

  return (
    <Layout style={styles.container}>
      <FocusAwareStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <View style={styles.container}>
        <Text category="h5">Account</Text>
        <View style={styles.menuCard}>
          <Menu style={{backgroundColor: 'transparent'}}>
            <MenuItem
              onPress={() => navigation.navigate(RouteNames.rootProfile)}
              title="Profile"
              style={styles.menuItem}
              accessoryLeft={props => (
                <Icon {...props} name="user" pack="feather" color={iconColor} />
              )}
              accessoryRight={ForwardIcon}
            />
            <MenuItem
              title="Password"
              onPress={() => navigation.navigate(RouteNames.changePassword)}
              style={styles.menuItem}
              accessoryRight={ForwardIcon}
              accessoryLeft={props => (
                <Icon
                  {...props}
                  name="form-textbox-password"
                  pack="material-community"
                  color={iconColor}
                />
              )}
            />
            <MenuItem
              onPress={() => navigation.navigate(RouteNames.notifications)}
              title="Notifications"
              style={styles.menuItem}
              accessoryRight={ForwardIcon}
              accessoryLeft={props => (
                <Icon
                  {...props}
                  name="bell-outline"
                  pack="material-community"
                  color={iconColor}
                />
              )}
            />
          </Menu>
        </View>
        <View style={{height: 20}} />
        <Text category="h5">More</Text>
        <View style={styles.menuCard}>
          <Menu style={{backgroundColor: 'transparent'}}>
            <MenuItem
              onPress={handleRateUsPress}
              title="Rate & Review"
              style={styles.menuItem}
              accessoryLeft={props => (
                <Icon
                  {...props}
                  name="star-outline"
                  pack="material-community"
                  color={iconColor}
                />
              )}
              accessoryRight={ForwardIcon}
            />
            <MenuItem
              onPress={() => navigation.navigate(RouteNames.support)}
              title="Help"
              style={styles.menuItem}
              accessoryRight={ForwardIcon}
              accessoryLeft={props => (
                <Icon
                  {...props}
                  name="help-circle-outline"
                  pack="material-community"
                  color={iconColor}
                />
              )}
            />
          </Menu>
        </View>
        <View style={styles.footer}>
          <PlatformPressable onPress={onLogout}>
            <Text>Log out</Text>
          </PlatformPressable>
        </View>
      </View>
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'background-basic-color-1',
  },

  menuCard: {
    backgroundColor: 'white',
    padding: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  menuItem: {
    backgroundColor: 'white',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
