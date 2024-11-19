import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {RootStackParamList} from './types';
import {RouteNames} from '../constants/route.name';
import {LoginScreen} from '../../screens/auth/login.screen';
import {ForgotPasswordScreen} from '../../screens/forgot-password/forgot-password.screen';
import {SignUpScreen} from '../../screens/auth/signup.screen';
import {HomeDrawer} from '../home-drawer/drawer';
import {Alert, BackHandler} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  useEffect(() => {
    const backAction = () => {
      // Custom behavior when back button is pressed
      Alert.alert('Exit App?', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      // Return true to prevent the default behavior of going back
      return true;
    };

    // Add the event listener for the back button
    BackHandler.addEventListener('hardwareBackPress', backAction);

    // Clean up the event listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);
  return (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
        initialRouteName={RouteNames.login}>
        <Stack.Screen name={RouteNames.login} component={LoginScreen} />
        <Stack.Screen name={RouteNames.signUp} component={SignUpScreen} />
        <Stack.Screen
          name={RouteNames.forgotPassword}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name={RouteNames.homeDrawer} component={HomeDrawer} />
      </Stack.Navigator>
    </React.Fragment>
  );
};
