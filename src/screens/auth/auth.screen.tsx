import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthCircle, LogoPrimary} from '../../components/svgs';
import {COMMON_STYLES} from '../../components/themes/common-styles';
import {RouteNames} from '../../navigations/constants/route.name';
import {RootStackScreenProps} from '../../navigations/root/types';
import {Colors} from '../../constants/colors';

export const AuthenticationScreen: React.FC<
  RootStackScreenProps<RouteNames.authentication>
> = ({navigation}) => {
  const styles = useStyleSheet(themedStyle);
  const handleSignUpPress = () => {
    navigation.navigate(RouteNames.signUp);
  };

  const handleSignInPress = () => {
    navigation.navigate(RouteNames.login);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={Colors.basicBackgroundColor1}
        barStyle="dark-content"
      />
      <Layout style={[COMMON_STYLES.LAYOUT_COINTAINER]}>
        <View
          style={[
            COMMON_STYLES.CENTER_CONTAINER,
            {flex: 1.3, flexDirection: 'row'},
          ]}>
          <View
            style={[COMMON_STYLES.CENTER_CONTAINER, {alignSelf: 'flex-end'}]}>
            <AuthCircle />
            <LogoPrimary style={styles.logo} />
          </View>
        </View>
        <View style={COMMON_STYLES.CENTER_CONTAINER}>
          <Button
            style={[styles.button, {marginBottom: 20}]}
            onPress={handleSignInPress}>
            Sign In
          </Button>
          <Button
            style={[styles.outlineButton]}
            appearance="outline"
            onPress={handleSignUpPress}>
            Sign Up
          </Button>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    position: 'absolute',
  },

  button: {
    width: '100%',
    height: 50,
  },
  outlineButton: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 50,
  },
});
