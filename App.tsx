import {Refine} from '@refinedev/core';
import React, {Fragment} from 'react';
import {
  authProvider,
  myCustomDataProvider,
  notificationProvider,
} from './src/providers';
import {MainNavigation} from './src/navigations/main';
import * as eva from '@eva-design/eva';
import {IconRegistry, Text} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from 'react-native-toast-message';
import {
  AntDesignIconsPack,
  AssetIconsPack,
  EntypoIconsPack,
  EvilIconsPack,
  FeatherIconsPack,
  FontAwesome5IconsPack,
  FontAwesomeIconsPack,
  FontistoIconsPack,
  FoundationIconsPack,
  IonIconsPack,
  MaterialCommunityIconsPack,
  MaterialIconsPack,
  OctiIconsPack,
  SimpleLineIconsPack,
  ZocialIconsPack,
} from './src/components/icons';
import {AppThemeProvider} from './src/components/themes';
import {StoreProvider} from './src/redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Config from 'react-native-config';
import {BASE_URL} from '@env';
import {ToastProvider} from 'react-native-toast-notifications';

import {enableScreens} from 'react-native-screens';
import {View} from 'react-native';

enableScreens(false); // Disable screens optimizations

const toastConfig: ToastConfig = {
  success: (props: any) => (
    <ErrorToast
      {...props}
      style={{backgroundColor: 'green', borderLeftColor: 'green'}}
      text1Style={{
        color: 'white',
      }}
      text2Style={{
        color: 'white',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{backgroundColor: 'red', borderLeftColor: 'red'}}
      text1Style={{
        color: 'white',
      }}
      text2Style={{
        color: 'white',
      }}
    />
  ),
};

export const App = () => {
  console.log(Config.API_KEY, Config.BASE_URL, BASE_URL);
  return (
    <StoreProvider>
      <ToastProvider placement="bottom">
        <Refine
          dataProvider={myCustomDataProvider}
          authProvider={authProvider}
          notificationProvider={notificationProvider}
          resources={[
            {
              name: 'users',
              list: '/users',
              create: '/users/create',
              edit: '/users/edit/:id',
              show: '/users/show/:id',
              meta: {
                canDelete: true,
                label: 'Users',
              },
            },
          ]}>
          <Fragment>
            <IconRegistry
              icons={[
                EvaIconsPack,
                AntDesignIconsPack,
                EntypoIconsPack,
                EvilIconsPack,
                FeatherIconsPack,
                FontAwesomeIconsPack,
                FontAwesome5IconsPack,
                FontistoIconsPack,
                FoundationIconsPack,
                IonIconsPack,
                MaterialCommunityIconsPack,
                MaterialIconsPack,
                OctiIconsPack,
                SimpleLineIconsPack,
                ZocialIconsPack,
                AssetIconsPack,
              ]}
            />
            <SafeAreaProvider style={{flex: 1}}>
              <AppThemeProvider>
                <MainNavigation />
              </AppThemeProvider>
            </SafeAreaProvider>
          </Fragment>
        </Refine>
        <Toast config={toastConfig} />
      </ToastProvider>
    </StoreProvider>
  );
};
