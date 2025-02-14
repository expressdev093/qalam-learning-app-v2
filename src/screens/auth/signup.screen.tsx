import React from 'react';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {Colors} from '../../constants/colors';
import {SignUpForm} from './components/signup.form';
import {View} from 'react-native-animatable';
import {Layout, StyleService, Text, useStyleSheet} from '@ui-kitten/components';

export const SignUpScreen: React.FC<
  RootStackScreenProps<RouteNames.signUp>
> = ({navigation}) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={Colors.basicBackgroundColor1}
        barStyle="dark-content"
      />
      <Layout style={styles.container}>
        <Text category="h2" style={styles.heading1}>
          Sign Up
        </Text>
        <Text category="p1" style={styles.p}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </Text>
        <SignUpForm />
      </Layout>
    </SafeAreaView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
  },
  backButtonView: {
    paddingHorizontal: 20,
  },
  heading1: {
    color: 'color-primary-500',
  },
  p: {
    textAlign: 'center',
    marginTop: 10,
  },
});
